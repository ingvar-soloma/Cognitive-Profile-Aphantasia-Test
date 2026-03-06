import os
import httpx
import jwt
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import base64
import time
import hashlib
import hmac
import logging
from google.oauth2 import id_token
from google.auth.transport import requests

logger = logging.getLogger(__name__)

router = APIRouter()

class GoogleExchangeRequest(BaseModel):
    credential: str

@router.post("/auth/google/exchange")
async def exchange_google_code(req: GoogleExchangeRequest):
    client_id = os.getenv("VITE_GOOGLE_CLIENT_ID", "")
    try:
        idinfo = id_token.verify_oauth2_token(req.credential, requests.Request(), client_id, clock_skew_in_seconds=10)
        
        user_id = idinfo['sub']
        first_name = idinfo.get("given_name", "GoogleUser")
        last_name = idinfo.get("family_name", "")
        username = idinfo.get("email", "")
        photo_url = idinfo.get("picture", "")
        auth_date = int(time.time())

        # For HMAC generation, we'll use a secret from environment or default
        # Since we removed Telegram, we might want to rename this ENV, but for now 
        # using TELEGRAM_BOT_TOKEN as the secret key for backward compatibility of hashes if needed,
        # or just define a new AUTH_SECRET.
        auth_secret = os.getenv("AUTH_SECRET", os.getenv("TELEGRAM_BOT_TOKEN", "default-secret-for-hmac"))
            
        auth_data = {
            "id": user_id,
            "first_name": first_name,
            "auth_date": auth_date
        }
        if last_name: auth_data["last_name"] = last_name
        if username: auth_data["username"] = username
        if photo_url: auth_data["photo_url"] = photo_url

        data_check_list = []
        for key, value in sorted(auth_data.items()):
            if value is not None:
                data_check_list.append(f"{key}={value}")
        data_check_string = "\n".join(data_check_list)
        secret_key = hashlib.sha256(auth_secret.encode()).digest()
        hash_value = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        auth_data["hash"] = hash_value

        return auth_data
    except ValueError as e:
        logger.error(f"Google verification failed: {e}")
        raise HTTPException(status_code=400, detail="Invalid Google token")

