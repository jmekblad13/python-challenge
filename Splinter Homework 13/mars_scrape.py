from bs4 import BeautifulSoup
import requests
from splinter import Browser
import pandas as pd
#from selenium import webdriver

def init_browser():
    # @NOTE: Replace the path with your actual path to the chromedriver
    executable_path = {"executable_path": "./chromedriver"}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
    browser = init_browser()

    url = "https://mars.nasa.gov/news/"
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, "html.parser")

    results = soup.find_all('li', class_="slide")

    def parse_result(result):
        output = {"title":"","paragraph":""}
        if(result.find("div", {"class":"content_title"})): output['title'] = result.find("a", {"class":"result-title"}).text
        if(result.find("div", {"class":"article_teaser_body"})): output['paragraph'] = result.find("span", {"class":"result-price"}).text
        #if(result.find("span", {"class":"result-hood"})): output['hood'] = result.find("span", {"class":"result-hood"}).text
        #print(results)
        return output

    articles = [parse_result(x) for x in results]

    
    
    
    #url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    #browser.visit(url)
    #browser.click_link_by_partial_text('MORE')
    #browser.click_link_by_id('full_image')
    #more_info_elem = browser.find_link_by_partial_text('more info')
    #more_info_elem.click()
    #html = browser.html
    #soup = BeautifulSoup(html, 'html.parser')
    #photos = soup.find_all('figure')
    #for photo in photos:
        # Use Beautiful Soup's find() method to navigate and retrieve attributes
    #hold = photo.find('img')
    #    link = photo.find('a')
    #    href = link['href']
    #print(link)
    photo_link = "https://www.jpl.nasa.gov/spaceimages/images/mediumsize/PIA19177_ip.jpg"
    #    print(photo_link)
    #return photo_link

    url = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url)
# Retrieve page with the requests module
    response = requests.get(url)
# Create BeautifulSoup object; parse with 'lxml'
    html = browser.html
    soup = BeautifulSoup(html, 'html.parser')
    results = soup.find('div', class_="ProfileTimeline")
    mars_weather = results.find('p').text


    url = 'http://space-facts.com/mars/'
    mars_info_table = pd.read_html(url)

    


    url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(url)
    hemispheres = ["Valles Marineris Hemisphere", "Cerberus Hemisphere", "Schiaparelli Hemisphere", "Syrtis Major"]
    hemisphere_image_urls = []
    for h in hemispheres:
        browser.visit(url)
        browser.click_link_by_partial_text(h)
        html = browser.html
        # Parse HTML with Beautiful Soup
        soup = BeautifulSoup(html, 'html.parser')
    
        divs = soup.find('div', class_ = "downloads")
        
        link = divs.find('a')
        img_url = link['href']
        
        hemisphere_image_urls.append({"title": h, "img_url": img_url})


    scrape_dict = {"articles":articles,"photo_link":photo_link,"mars_weather":mars_weather,"mars_info_table":mars_info_table,"hemisphere_image_urls":hemisphere_image_urls}
    


    return scrape_dict