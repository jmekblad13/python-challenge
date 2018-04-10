use sakila;

-- 1a. Display the first and last names of all actors from the table `actor`. --
select first_name, last_name from actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`. --
ALTER TABLE actor
ADD COLUMN `Actor Name` varchar(40) NOT NULL;

select * from actor;

UPDATE actor SET `Actor Name` = concat(upper(actor.first_name)," ",upper(actor.last_name));

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information? --
select actor_id, first_name, last_name from actor where first_name = "Joe";
  	
-- 2b. Find all actors whose last name contain the letters `GEN`: --
select * from actor where last_name like "%GEN%";
  	
-- 2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:--
select * from actor where last_name like "%LI%" order by last_name, first_name;

-- 2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China: --
select country_id, country from country where country in ("Afghanistan", "Bangladesh", "China");

-- 3a. Add a `middle_name` column to the table `actor`. Position it between `first_name` and `last_name`. Hint: you will need to specify the data type. --
alter table actor ADD COLUMN middle_name varchar(40) NOT NULL after first_name;
select * from actor;
  	
-- 3b. You realize that some of these actors have tremendously long last names. Change the data type of the `middle_name` column to `blobs`. --
alter table actor modify middle_name blob;
show fields from actor;

-- 3c. Now delete the `middle_name` column. --
alter table actor drop column middle_name;
select * from actor;

-- 4a. List the last names of actors, as well as how many actors have that last name. --
select last_name, count(*) as count from actor group by last_name;
  	
-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors --
select last_name, count(*) as count from actor group by last_name having count > 1;
  	
-- * 4c. Oh, no! The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record. --
select * from actor where `Actor Name` = "GROUCHO WILLIAMS";
UPDATE actor SET first_name = "HARPO" WHERE `Actor Name`="GROUCHO WILLIAMS";
UPDATE actor SET `Actor Name` = "HARPO WILLIAMS" WHERE `Actor Name`="GROUCHO WILLIAMS";
select * from actor where `Actor Name` = "HARPO WILLIAMS";

select * from actor where first_name = "HARPO";
  	
-- * 4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`. Otherwise, change the first name to `MUCHO GROUCHO`, as that is exactly what the actor will be with the grievous error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO `MUCHO GROUCHO`, HOWEVER! (Hint: update the record using a unique identifier.) --
update actor set first_name = "GROUCHO" where actor_id = 172;
select * from actor where first_name = "HARPO";

-- * 5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it? -- 

show create table address;
select * from address;

-- * 6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`: --
select * from staff;
select * from address;
select s.first_name, s.last_name, a.address
from staff s
INNER JOIN address a ON
s.address_id = a.address_id;

-- * 6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`. --
select * from payment;
select * from staff;

select s.first_name, s.last_name, sum(p.amount)
from staff s
inner join payment p on 
s.staff_id = p.staff_id
where p.payment_date like '2005-08%' group by s.first_name;

-- * 6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.
select * from film;
select * from film_actor;

select f.title, count(a.actor_id)
from film f
inner join film_actor a on 
f.film_id = a.film_id group by f.title;  
	
-- * 6d. How many copies of the film `Hunchback Impossible` exist in the inventory system? --
SELECT count(*)
FROM inventory
WHERE film_id IN
(
  SELECT film_id
  FROM film
  WHERE title = "Hunchback Impossible"
);

select * from inventory;
select * from film;

-- * 6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. List the customers alphabetically by last name: --
  
select * from payment;
select * from customer;

select c. first_name, c.last_name, sum(p.amount)
from payment p
inner join customer c on 
p.customer_id = c.customer_id
group by c.last_name order by c.last_name;  

-- * 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English. --

select * from film;
select * from language;

SELECT title FROM film WHERE title like 'Q%' or title like 'K%'
UNION
select title from film where language_id in
(
	select language_id from language where name = 'English'
);


-- * 7b. Use subqueries to display all actors who appear in the film `Alone Trip`. --
 
select * from film; 
select * from film_actor;
select * from actor;

select first_name, last_name from actor where actor_id in(
	SELECT actor_id
       FROM film_actor
       WHERE film_id IN
       (
        SELECT film_id
        FROM film
        WHERE title = 'Alone Trip'
       )
	);
   
-- * 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information. --
select * from customer;
select * from address;
select * from city;
select * from country;

select c.first_name, c.last_name, c.email, cty.country
from customer c, address a, city cy, country cty
where c.address_id = a.address_id and a.city_id = cy.city_id and cy.country_id = cty.country_id and cty.country = 'Canada';

-- * 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films. --
select * from film;
select * from category;
select * from film_category;

select title from film where film_id in
(
	select film_id from film_category where category_id in
    (
		select category_id from category where name = 'Family'
	)
);

-- * 7e. Display the most frequently rented movies in descending order. --
select * from rental;
select * from inventory;
select * from film;

select f.title, count(*)
from film f, inventory i, rental r
where f.film_id = i.film_id and i.inventory_id = r.inventory_id
group by f.title order by count(*) desc;
  	
-- * 7f. Write a query to display how much business, in dollars, each store brought in. --
select * from store;
select * from payment;

select s.store_id, sum(p.amount)
from store s, payment p
where s.manager_staff_id = p.staff_id 
group by s.store_id;

-- * 7g. Write a query to display for each store its store ID, city, and country. --
select * from address;

select s.store_id, c.city, cty.country
from store s, address a, city c, country cty
where a.address_id = s.address_id and a.city_id = c.city_id and cty.country_id=c.country_id;
  	
-- * 7h. List the top five genres in gross revenue in descending order. (**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.) --
select * from category;
select * from film_category;
select * from inventory;
select * from rental;
select * from payment;

select c.name, sum(p.amount) from 
film_category f, category c, inventory i, rental r, payment p 
where c.category_id = f.category_id and i.film_id = f.film_id and r.inventory_id = i.inventory_id and r.rental_id = p.rental_id
GROUP BY c.name order by sum(p.amount) desc limit 5;
  	
-- * 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.  --
    
Create View my_view as
select c.name, sum(p.amount) from 
film_category f, category c, inventory i, rental r, payment p 
where c.category_id = f.category_id and i.film_id = f.film_id and r.inventory_id = i.inventory_id and r.rental_id = p.rental_id
GROUP BY c.name order by sum(p.amount) desc limit 5;

-- * 8b. How would you display the view that you created in 8a? --
show create view my_view;

-- * 8c. You find that you no longer need the view `top_five_genres`. Write a query to delete it. --
drop view my_view;
