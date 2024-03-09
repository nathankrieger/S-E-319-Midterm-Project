import json

als = '\t'.join('''Agricultural Business
Agricultural and Life Sciences Education
Agricultural Studies
Agriculture and Society
Agricultural Systems Technology
Agronomy
Animal Ecology
Animal Science
Biochemistry
Biology
Culinary Food Science
Dairy Science
Diet and Exercise
Dietetics
Environmental Science
Food Science
Forestry
Genetics
Global Resource Systems
Horticulture
Industrial Technology
Microbiology
Nursing
Nutritional Science
Environmental Studies
International Agriculture
Seed Science
Agricultural Business
Agricultural and Life Sciences Education
Agricultural Systems Technology
Agronomy
Animal Ecology
Animal Science
Biochemistry
Biology
Culinary Food Science
Environmental Studies
Food and Society
Food Science
Forestry
Genetics
Horticulture
Industrial Technology
Insect Science
International Agriculture
Landscape Management
Meat Science
Microbiology
Nutrition'''.split('\n'))

bus = '\t'.join('''Accounting
Actuarial Science
Business Analytics
Business Economics
Entrepreneurship
Finance
International Business
Management
Management Information Systems
Marketing
Supply Chain Management
Bachelors of Business Administration
Accounting
Business Analytics
Entrepreneurship
Finance
International Business
Management
Management Information Systems
Marketing
Supply Chain Management'''.split('\n'))

des = '\t'.join('''Art and Design
Architecture
Community and Regional Planning
Graphic Design
Industrial Design
Integrated Studio Arts
Interdisciplinary Design
Interior Design
Landscape Architecture
Critical Studies in Design
Design Studies
Digital Media
Entrepreneurship
Geographic Information Science (GISC)
Illustration
Preservation and Cultural Heritage
Textile Design
Urban Studies'''.split('\n'))

eng = '\t'.join('''Aerospace Engineering
Agricultural Engineering
Biological Systems Engineering
Chemical Engineering
Civil Engineering
Computer Engineering
Construction Engineering
Cyber Security Engineering
Electrical Engineering
Engineering Mechanics
Environmental Engineering
Industrial Engineering
Materials Engineering
Materials Science and Engineering
Mechanical Engineering
Software Engineering
Systems Engineering
Biomedical Engineering
Cyber-Physical Systems
Cyber Security
Energy Systems
Engineering Sales
Non-Destructive Evaluation Engineering'''.split('\n'))

las = '\t'.join('''Advertising
Anthropology
Biochemistry
Bioinformatics and Computational Biology
Biological/Pre-Medical Illustration
Biology
Biophysics
Chemistry
Communication Studies
Computer Science
Criminal Justice
Data Science
Earth Science
Economics
English
Environmental Science
Environmental Studies
French
Genetics
Geology
German
History
Interdisciplinary Studies
International Studies
Journalism and Mass Communication
Liberal Studies
Linguistics
Mathematics
Meteorology
Music
Performing Arts
Philosophy
Physics
Political Science
Psychology
Public Relations
Religious Studies
Sociology
Software Engineering
Spanish
Speech Communication
Statistics
Technical Communication
Women’s and Gender Studies
Advertising
African and African American Studies
American Indian Studies
Anthropology
Astronomy
Biochemistry
Bioinformatics and Computational Biology
Biological Illustration
Biology
Chemistry
Chinese Studies
Classical Studies
Communication Studies
Computer Science
Criminal Justice
Data Science
Economics
English
Environmental Studies
Ethics
French
Genetics
Geology
German
Gerontology
History
International Studies
Journalism and Mass Communication
Latin
Leadership Studies
Linguistics
Mathematics
Meteorology
Middle Eastern Studies
Music
Music Technology
Performing Arts
Philosophy
Physics
Political Science
Psychology
Public Relations
Religious Studies
Russian Studies
Sociology
Spanish
Speech Communication
Statistics
Teaching English as a Second Language
Technical Communication
U.S. Latino/a Studies
Women’s and Gender Studies
World Film Studies'''.split('\n'))

vet = '\t'.join('''Biomedical Sciences
Veterinary Clinical Sciences
Veterinary Diagnostic and Production Animal Medicine
Veterinary Microbiology and Preventive Medicine
Veterinary Pathology'''.split('\n'))

hs = '\t'.join('''Apparel, Merchandising, and Design
Event Management
Hospitality Management
Culinary Food Science
Diet and Exercise
Dietetics
Food Science
Nursing:
Nutritional Science
Child, Adult, and Family Services
Early Childhood Education - Unified
Family and Consumer Sciences Education and Studies
Financial Counseling and Planning
Affiliated Program: Early Childcare Education and Programming. 
Athletic Training
Diet and Exercise
Kinesiology & Health
Early Childhood Education - Unified
Elementary Education
K-12/Secondary Education
Apparel, Merchandising, and Design
Child, Adult, and Family Services
Culinary Food Science
Dance
Educational Services in Family and Consumer Sciences
Event Management
Exercise Science
Financial Counseling and Planning
Food and Society
Food Science    
Health Promotion
Hospitality Management
Learning and Leadership Sciences
Learning Technologies
Kinesiology
Nutrition'''.split('\n'))



majors = json.loads(open("./courses.json").read())
data = {"Agriculture and Life Sciences": [],
        "Business": [],
        "Design": [],
        "Engineering": [],
        "Human Sciences": [],
        "Liberal Arts and Sciences": [],
        "Veterinary Medicine": [],
        "undecided": []}

for major in majors:
    if major["major"].split('(')[0].strip() in als:
        data['Agriculture and Life Sciences'].append(major)
    elif major["major"].split('(')[0].strip() in bus:
        data['Business'].append(major)
    elif major["major"].split('(')[0].strip() in des:
        data['Design'].append(major)
    elif major["major"].split('(')[0].strip() in eng:
        data['Engineering'].append(major)
    elif major["major"].split('(')[0].strip() in vet:
        data['Veterinary Medicine'].append(major)
    elif major["major"].split('(')[0].strip() in las:
        data['Liberal Arts and Sciences'].append(major)
    elif major["major"].split('(')[0].strip() in hs:
        data['Human Sciences'].append(major)
    else:
        data['undecided'].append(major)

file = open("colleges.json", "w")
file.write(json.dumps(data, indent=4))
file.close()

print(len(data["undecided"]))
