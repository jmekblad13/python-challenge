import os
import csv

#fileset number can change to work with multiple or different files
fileset = ["2"]

months = 0
revenue = float(0.00)
previous = float(0)
change = float(0)
totalchange = float(0)
greatest_increase = float(0)
greatest_increase_month = ""
greatest_decrease = float(0)
greatest_decrease_month = ""

for i in fileset:

    input_filename = "budget_data_" + str(i) + ".csv"

    budget_csv = os.path.join(input_filename)

    with open(budget_csv, newline="") as csvfile:
        csvreader= csv.reader(csvfile, delimiter=",")
        
        next(csvreader, None)
        for row in csvreader:
            months = months + 1
            revenue = revenue + float(row[1])            
            change = float(row[1]) - previous
            totalchange = totalchange + change
            if change > greatest_increase:
                greatest_increase = change
                greatest_increase_month = row[0]
            if change < greatest_decrease:
                greatest_decrease = change
                greatest_decrease_month = row[0]
            previous = float(row[1])


print("```")
print("Financial Analysis")
print("----------------------------")
print("Total Months: " + str(months))
print("Total Revenue: $" + str(revenue))
print("Average Revenue Change: $" + str(round(totalchange/(months-1),0)))
print("Greatest Increase in Revenue: " + greatest_increase_month + " ($" + str(greatest_increase) + ")")
print("Greatest Decrease in Revenue: " + greatest_decrease_month + " ($" + str(greatest_decrease) + ")")
print("```")

output_path = os.path.join('new.csv')

with open(output_path, 'w', newline='') as csvfile:

    csvwriter = csv.writer(csvfile, delimiter=',')

    csvwriter.writerow(["```"])
    csvwriter.writerow(["Financial Analysis"])
    csvwriter.writerow(["----------------------------"])
    csvwriter.writerow(["Total Months: " + str(months)])
    csvwriter.writerow(["Total Revenue: $" + str(revenue)])
    csvwriter.writerow(["Average Revenue Change: $" + str(round(totalchange/(months-1),0))])
    csvwriter.writerow(["Greatest Increase in Revenue: " + greatest_increase_month + " ($" + str(greatest_increase) + ")"])
    csvwriter.writerow(["Greatest Decrease in Revenue: " + greatest_decrease_month + " ($" + str(greatest_decrease) + ")"])
    csvwriter.writerow(["```"])