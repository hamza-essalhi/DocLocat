import json

def change_categorie_to_category_and_add_verified(json_data):
    # Load the JSON data
    data = json.loads(json_data)
    
    # Iterate through each item in the JSON data
    for item in data:
        # Check if the "categorie" key exists in the item
        if "categorie" in item:
            # Rename "categorie" to "category"
            item["category"] = item.pop("categorie")
        
        # Add "verified: true"
        item["verified"] = True
        
        # Remove "_id" if it exists
        item.pop("_id", None)
    
    # Convert the updated data back to JSON format
    updated_json_data = json.dumps(data, indent=2)
    
    return updated_json_data

# Example JSON data
json_data = '''
[
    {
        "verified": false,
        "_id": "65f249c96a2f1800c7c38fd4",
        "firstName": "Houda",
        "lastName": "Chakiri",
        "email": "houda@example.com",
        "phone": "+212611223422",
        "role": "doctor",
        "profilePicture": "https://plus.unsplash.com/premium_photo-1661765470809-13fa794d995f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Passionate dermatologist dedicated to patient skincare.",
        "categorie": "Dermatology",
        "address": "333 Pine Avenue",
        "city": "Tetouan"
    },
    {
        "verified": false,
        "_id": "65f249c96a2f1800c7c38fd5",
        "firstName": "Nadia",
        "lastName": "Bennani",
        "email": "nadia@example.com",
        "phone": "+212611223433",
        "role": "doctor",
        "profilePicture": "https://plus.unsplash.com/premium_photo-1681966907271-1e350ec3bb95?q=80&w=1493&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Experienced radiologist with a passion for diagnostic imaging.",
        "categorie": "Radiology",
        "address": "444 Elm Road",
        "city": "Safi"
    },
    {
        "verified": false,
        "_id": "65f249fe6a2f1800c7c3b518",
        "firstName": "Youssef",
        "lastName": "El Alaoui",
        "email": "youssef@example.com",
        "phone": "+212611223344",
        "role": "doctor",
        "profilePicture": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Experienced neurologist with a passion for helping patients.",
        "categorie": "Neurology",
        "address": "123 Main Street",
        "city": "Casablanca"
    },
    {
        "verified": false,
        "_id": "65f249fe6a2f1800c7c3b519",
        "firstName": "Mohammed",
        "lastName": "Bouazzaoui",
        "email": "mohammed@example.com",
        "phone": "+212611223355",
        "role": "doctor",
        "profilePicture": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Dedicated cardiologist with a focus on patient care.",
        "categorie": "Cardiology",
        "address": "456 Elm Avenue",
        "city": "Rabat"
    },
    {
        "verified": false,
        "_id": "65f249fe6a2f1800c7c3b51a",
        "firstName": "Omar",
        "lastName": "Chakir",
        "email": "omar@example.com",
        "phone": "+212611223366",
        "role": "doctor",
        "profilePicture": "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Passionate gastroenterologist dedicated to improving patient health.",
        "categorie": "Gastroenterology",
        "address": "789 Oak Lane",
        "city": "Fes"
    },
    {
        "verified": false,
        "_id": "65f249fe6a2f1800c7c3b51b",
        "firstName": "Ali",
        "lastName": "Zouitene",
        "email": "ali@example.com",
        "phone": "+212611223377",
        "role": "doctor",
        "profilePicture": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Orthopedic surgeon specializing in sports injuries.",
        "categorie": "Orthopedic Surgery",
        "address": "321 Pine Street",
        "city": "Marrakech"
    },
    {
        "verified": false,
        "_id": "65f249fe6a2f1800c7c3b51c",
        "firstName": "Karim",
        "lastName": "Bouzid",
        "email": "karim@example.com",
        "phone": "+212611223388",
        "role": "doctor",
        "profilePicture": "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Passionate pediatrician focused on child development.",
        "categorie": "Pediatrics",
        "address": "987 Maple Drive",
        "city": "Agadir"
    },
    {
        "verified": false,
        "_id": "65f249fe6a2f1800c7c3b51d",
        "firstName": "Adil",
        "lastName": "Benmoussa",
        "email": "adil@example.com",
        "phone": "+212611223399",
        "role": "doctor",
        "profilePicture": "https://plus.unsplash.com/premium_photo-1661281397737-9b5d75b52beb?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Experienced urologist with a passion for patient care.",
        "categorie": "Urology",
        "address": "654 Cedar Road",
        "city": "Tangier"
    },
    {
        "verified": false,
        "_id": "65f250106a2f1800c7c80bb5",
        "firstName": "Ahmed",
        "lastName": "Abdullahi",
        "email": "ahmed.abdullahi@example.com",
        "phone": "+212611223344",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Experienced neurologist with a passion for helping patients.",
        "categorie": "Neurology",
        "address": "123 Main Street",
        "city": "Casablanca"
    },
    {
        "verified": false,
        "_id": "65f250106a2f1800c7c80bb6",
        "firstName": "Karim",
        "lastName": "Khadiri",
        "email": "karim.khadiri@example.com",
        "phone": "+212611223355",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Dedicated cardiologist with a focus on patient care.",
        "categorie": "Cardiology",
        "address": "456 Elm Avenue",
        "city": "Rabat"
    },
    {
        "verified": false,
        "_id": "65f250106a2f1800c7c80bb7",
        "firstName": "Said",
        "lastName": "Lahcen",
        "email": "said.lahcen@example.com",
        "phone": "+212611223366",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Passionate gastroenterologist dedicated to improving patient health.",
        "categorie": "Gastroenterology",
        "address": "789 Oak Lane",
        "city": "Fes"
    },
    {
        "verified": false,
        "_id": "65f250106a2f1800c7c80bb8",
        "firstName": "Hassan",
        "lastName": "Amrani",
        "email": "hassan.amrani@example.com",
        "phone": "+212611223377",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Orthopedic surgeon specializing in sports injuries.",
        "categorie": "Orthopedic Surgery",
        "address": "321 Pine Street",
        "city": "Marrakech"
    },
    {
        "verified": false,
        "_id": "65f250106a2f1800c7c80bb9",
        "firstName": "Khalid",
        "lastName": "Hassani",
        "email": "khalid.hassani@example.com",
        "phone": "+212611223388",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/4173239/pexels-photo-4173239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Passionate pediatrician focused on child development.",
        "categorie": "Pediatrics",
        "address": "987 Maple Drive",
        "city": "Agadir"
    },
    {
        "verified": false,
        "_id": "65f250106a2f1800c7c80bba",
        "firstName": "Yassine",
        "lastName": "El Kaddi",
        "email": "yassine.elkaddi@example.com",
        "phone": "+212611223399",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/4769130/pexels-photo-4769130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Experienced urologist with a passion for patient care.",
        "categorie": "Urology",
        "address": "654 Cedar Road",
        "city": "Tangier"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1ac",
        "firstName": "Fatima",
        "lastName": "El Hamidi",
        "email": "fatima.elhamidi@example.com",
        "phone": "+212611223400",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Dedicated obstetrician and gynecologist with a focus on women's health.",
        "categorie": "Obstetrics/Gynecology",
        "address": "123 Main Street",
        "city": "Casablanca"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1ad",
        "firstName": "Amina",
        "lastName": "Benali",
        "email": "amina.benali@example.com",
        "phone": "+212611223411",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/3259629/pexels-photo-3259629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Passionate dermatologist specializing in skincare and beauty.",
        "categorie": "Dermatology",
        "address": "456 Elm Avenue",
        "city": "Rabat"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1ae",
        "firstName": "Leila",
        "lastName": "Cherif",
        "email": "leila.cherif@example.com",
        "phone": "+212611223422",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/4225880/pexels-photo-4225880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Experienced endocrinologist dedicated to improving hormonal health.",
        "categorie": "Endocrinology",
        "address": "789 Oak Lane",
        "city": "Fes"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1af",
        "firstName": "Loubna",
        "lastName": "Dahmani",
        "email": "loubna.dahmani@example.com",
        "phone": "+212611223433",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Passionate neurologist specializing in brain disorders and treatments.",
        "categorie": "Neurology",
        "address": "321 Pine Street",
        "city": "Marrakech"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1b0",
        "firstName": "Nadia",
        "lastName": "Haddad",
        "email": "nadia.haddad@example.com",
        "phone": "+212611223444",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Passionate ophthalmologist dedicated to eye health and vision care.",
        "categorie": "Ophthalmology",
        "address": "987 Maple Drive",
        "city": "Agadir"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1b1",
        "firstName": "Sara",
        "lastName": "Khalidi",
        "email": "sara.khalidi@example.com",
        "phone": "+212611223455",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Experienced cardiologist dedicated to heart health and wellness.",
        "categorie": "Cardiology",
        "address": "654 Cedar Road",
        "city": "Tangier"
    },
    {
        "verified": false,
        "_id": "65f250d86a2f1800c7c8a1b2",
        "firstName": "Yasmina",
        "lastName": "Idrissi",
        "email": "yasmina.idrissi@example.com",
        "phone": "+212611223466",
        "role": "doctor",
        "profilePicture": "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "about": "Passionate gastroenterologist dedicated to digestive health and nutrition.",
        "categorie": "Gastroenterology",
        "address": "852 Elm Street",
        "city": "Oujda"
    },
    {
        "_id": "65f87cab6a2f1800c789d88d",
        "firstName": "Sanaa",
        "lastName": "Belkacem",
        "email": "sanaa@example.com",
        "phone": "+212611223411",
        "role": "doctor",
        "profilePicture": "https://images.unsplash.com/photo-1590611936760-eeb9bc598548?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "about": "Skilled ophthalmologist with a commitment to patient eye health.",
        "categorie": "Ophthalmology",
        "address": "222 Oak Street",
        "city": "Kenitra",
        "verified": true
    }
]
'''

# Call the function with the JSON data
updated_json_data = change_categorie_to_category_and_add_verified(json_data)
print(updated_json_data)
