import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(
    "backend/service/kkdrink-95a3e-firebase-adminsdk-kf79p-e7d79f7a5c.json"
)
firebase_admin.initialize_app(cred)

db = firestore.client()


def get_matching_cocktails(user_ingredients):
    cocktails_ref = db.collection("cocktails")
    matched_cocktails = []

    # 簡單查詢，這裡模擬直接對集合進行過濾
    for cocktail in cocktails_ref.stream():
        cocktail_data = cocktail.to_dict()
        recipe_ingredients = set(cocktail_data.get("ingredients", []))

        # 計算匹配數量
        matching_ingredients = recipe_ingredients.intersection(user_ingredients)
        if matching_ingredients:
            matched_cocktails.append(
                {
                    "name": cocktail_data["name"],
                    "match_count": len(matching_ingredients),
                    "matching_ingredients": list(matching_ingredients),
                }
            )

    # 根據匹配度進行排序
    matched_cocktails.sort(key=lambda x: x["match_count"], reverse=True)
    return matched_cocktails


user_ingredients = ["rum", "lime", "sugar", "mint"]
recommended_cocktails = get_matching_cocktails(set(user_ingredients))

print("推薦結果:")
for cocktail in recommended_cocktails:
    print(
        f"名稱: {cocktail['name']}, 匹配項數量: {cocktail['match_count']}, 匹配材料: {cocktail['matching_ingredients']}"
    )
