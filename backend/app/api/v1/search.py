from fastapi import APIRouter, Query, Header, HTTPException
from ...services.es_client import search_keywords
from ...config import settings

router = APIRouter()

def check_api_key(x_api_key: str = Header(None)):
    if x_api_key != settings.API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")

@router.get("/search", dependencies=[Depends(check_api_key)])
def search(q: str = Query(...), page: int = 1, size: int = 20, sort: str = "volume:desc", country: str = None):
    filters = {}
    if country:
        filters["country"] = country
    return search_keywords(q, page, size, sort, filters)
