import csv
from elasticsearch import helpers
from ..services.es_client import es
from ..config import settings

def bulk_index(csv_path):
    def gen():
        with open(csv_path, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for r in reader:
                yield {
                    "_index": settings.ES_INDEX,
                    "_source": {
                        "keyword": r["keyword"],
                        "volume": int(r.get("volume") or 0),
                        "difficulty": float(r.get("difficulty") or 0.0),
                        "cpc": float(r.get("cpc") or 0.0),
                        "trend": int(r.get("trend") or 0),
                        "country": r.get("country","global"),
                        "language": r.get("language","en"),
                    }
                }
    helpers.bulk(es, gen())
