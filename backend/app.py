# 示例雞尾酒配方數據
cocktail_recipes = [
    {"name": "Mojito", "ingredients": ["rum", "mint", "sugar", "lime", "soda water"]},
    {"name": "Margarita", "ingredients": ["tequila", "lime", "cointreau"]},
    {"name": "Old Fashioned", "ingredients": ["bourbon", "sugar", "bitters"]},
    {
        "name": "Cosmopolitan",
        "ingredients": ["vodka", "cointreau", "cranberry juice", "lime"],
    },
    {"name": "Pina Colada", "ingredients": ["rum", "coconut milk", "pineapple juice"]},
]


def recommend_cocktails(user_ingredients: list[str]) -> list[dict]:
    recommendations = []

    for recipe in cocktail_recipes:
        # 計算使用者擁有的成分與雞尾酒配方的成分匹配的數量
        matching_ingredients = set(user_ingredients).intersection(
            set(recipe["ingredients"])
        )
        match_count = len(matching_ingredients)

        # 如果有匹配，添加推薦到列表中
        if match_count > 0:
            recommendations.append(
                {
                    "name": recipe["name"],
                    "match_count": match_count,
                    "matching_ingredients": matching_ingredients,
                }
            )

    # 按匹配數量排序，匹配數量最多的配方首先顯示
    recommendations = sorted(
        recommendations, key=lambda x: x["match_count"], reverse=True
    )

    return recommendations


# 使用者擁有的材料
user_ingredients = ["rum", "lime", "sugar", "mint"]

# 獲取推薦
recommended_cocktails = recommend_cocktails(user_ingredients)

print("推薦的雞尾酒：")
for cocktail in recommended_cocktails:
    print(
        f"名稱: {cocktail['name']}, 匹配的材料數量: {cocktail['match_count']}, 匹配的材料: {cocktail['matching_ingredients']}"
    )
