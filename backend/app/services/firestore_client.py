from google.cloud import firestore
from ..config import settings

# either point to credentials with GOOGLE_APPLICATION_CREDENTIALS env or use default application creds.
db = firestore.Client(project=settings.FIRESTORE_PROJECT)

def save_user_saved_list(user_id: str, list_name: str, keywords: list):
    doc_ref = db.collection("users").document(user_id).collection("saved_lists").document()
    doc_ref.set({
        "name": list_name,
        "keywords": keywords,
        "created_at": firestore.SERVER_TIMESTAMP
    })
    return {"id": doc_ref.id}
