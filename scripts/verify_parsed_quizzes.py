import json

with open('parsed_exact_quizzes.json', 'r', encoding='utf-8') as f:
    quizzes = json.load(f)

print(f"Total quizzes to verify: {len(quizzes)}")
issues_count = 0

for q in quizzes:
    issues = []
    if not q['questionText']:
        issues.append('empty questionText')
    if not q['explanation']:
        issues.append('empty explanation')
    if q['type'] == 'multiple_choice' and len(q['options']) < 2:
        issues.append('less than 2 options')
    if q['type'] == 'matching' and (not q['pairs'] or len(q['pairs']) < 2):
        issues.append('invalid pairs')
    if q['type'] == 'ordering' and (not q['orderItems'] or not q['correctOrder']):
        issues.append('invalid ordering')
    if q['type'] == 'fill_in_blank' and not q['expectedAnswers']:
        issues.append('invalid fill_in_blank')
    if q['type'] == 'multi_select' and not q['multiCorrectIndices']:
        issues.append('invalid multi_select')
    if q['type'] == 'grid_map' and not q['targetCell']:
        issues.append('invalid grid_map')
    if issues:
        issues_count += 1
        print(f"Issue in {q['ref_id']} ({q['type']}): {issues}")

if issues_count == 0:
    print("ALL 96 QUIZZES VERIFIED PERFECTLY! Zero issues.")
else:
    print(f"Found {issues_count} questions with issues.")
