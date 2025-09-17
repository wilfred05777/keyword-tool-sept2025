from elasticsearch import Elasticsearch
from ..config import settings

es = Elasticsearch(settings.ES_HOST)

def search_keywords(query: str, page: int=1, size: int=20, sort: str = "volume:desc", filters: dict=None):
    body = {
        "query": {
            "bool": {
                "must": [
                    {"multi_match": {"query": query, "fields": ["keyword^3", "keyword"]}}
                ],
                "filter": []
            }
        },
        "sort": [ { k.split(':')[0]: {"order": k.split(':')[1]} } for k in [sort] ],
        "from": (page-1)*size,
        "size": size
    }
    if filters:
        for k,v in filters.items():
            if v is None: continue
            if isinstance(v, list):
                body["query"]["bool"]["filter"].append({"terms": {k: v}})
            else:
                body["query"]["bool"]["filter"].append({"term": {k: v}})
    res = es.search(index=settings.ES_INDEX, body=body)
    hits = [ {**h["_source"], "score": h["_score"], "id": h["_id"]} for h in res["hits"]["hits"] ]
    total = res["hits"]["total"]["value"]
    return {"total": total, "hits": hits}
