# Bamazon with mysql
## Bamazon Customer Program
Running the bamazon.js program in the terminal will display the entire inventory of the store to the user and <br>
a list prompt that will ask the user what department they would like to shop in.<br>
![listPrompt](images/bamazonCi.PNG?raw=true "products and list prompt")

After selecting a department from the list the user will then be shown the products from that specific department and a list of the products to choose from.
![depPrompt](images/deps.PNG?raw=true "department prompt")

After selecting a product the user will then be prompted to input a quantity. Bamzon.js will then caluculate the total and display the total dollar ammount of their order.
![userTot](images/custS.PNG?raw=true "total display")

## Bamazon Manager Program
Running the bamazonManager.js program in the terminal will display a list prompt that will allow the user to choose from one of 4 options.
![manOpt](images/bamazonMan.PNG?raw=true "manager list prompt")

If "view products for sale" is selected a list of all of the products available will be displayed in a table to the user.
![optOne](images/manOpt1.PNG?raw=true "manager option 1")

If "view low inventory" is selected a list of all of the available products with their stock status will be displayed.
![optTwo](images/manOpt2.PNG?raw=true "manager option 2")

If "add to inventory" is selected a list of all products and their stock status will be displayed to the user. The user will then be prompted to choose a product and input the ammount of stock they would like to add to the inventory. After completing the prompts the user will be given a message "Stock has been updated."
![optThree](images/manOpt3.PNG?raw=true "manager option 3")

If "add a new product" is selected the user will be prompted to input the name, price, and stock quantity for the product they would like to add. After filling out the prompts the user will be given a message that tells them the product they added has been added to list of available products.
![optFour](images/manOpt4.PNG?raw=true "manager option 4")

### Node modules required: 
mysql
inquirer
console.table
