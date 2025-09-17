import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    ES_HOST: str = os.getenv("ES_HOST", "http://elasticsearch:9200")
    ES_INDEX: str = "keywords"
    FIRESTORE_PROJECT: str = os.getenv("FIRESTORE_PROJECT", "")
    API_KEY: str = os.getenv("API_KEY", "devkey")
settings = Settings()
