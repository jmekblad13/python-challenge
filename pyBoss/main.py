import os
import csv
import datetime

us_state_abbrev = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
}

total = 0

# change this list to do multiple files or change files
fileset = ["1","2"]

for i in fileset:

    input_filename = "employee_data" + i + ".csv"

    employee_csv = os.path.join(input_filename)

    empID = []
    firstName = []
    lastName = []
    DOB = []
    SSN = []
    state = []    

    with open(employee_csv, newline="") as csvfile:
        csvreader= csv.reader(csvfile, delimiter=",")
        
        next(csvreader, None)
        
        for row in csvreader:
            
            empID.append(row[0])
            full_name = row[1].split(" ")
            firstName.append(full_name[0])
            lastName.append(full_name[1])
            DOB.append(datetime.datetime.strptime(str(row[2]),"%Y-%m-%d").strftime("%m/%d/%Y"))
            SSN.append("***-**-" + str(row[3])[-4:])
            state.append(us_state_abbrev[row[4]])
        

    # Zip lists together
    cleaned_csv = zip(empID, firstName, lastName, DOB, SSN, state)

    # Set variable for output file
    output_filename = "employee_data.csv"

    output_file = os.path.join(output_filename)

    #  Open the output file
    with open(output_file, "w", newline="") as datafile:
        writer = csv.writer(datafile)

        # Write the header row
        writer.writerow(["Emp ID", "First Name", "Last Name", "DOB",
                        "SSN", "State"])

        # Write in zipped rows
        writer.writerows(cleaned_csv)