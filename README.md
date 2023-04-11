# EXPO LINK : https://snack.expo.dev/@213group/bookmarks---project

# Objective:
The goal of our application is to create a mobile-designed book-searching interface. We want the user to open our app and see a list of the current new-york-times best-sellers. From this home page, the user can search for any book by either the book’s title or the author’s name. The search will return the first 10-20 books found in a separate API. 

When selecting a book, a dedicated display of the book’s cover image, title, author, pub date, etc should be visible. A button to add the book to the favourites tab will be available for the user. We may try implementing a method of favouriting a book without having to inspect it.

When selecting the favourites tab, all books the user marked should be visible, ideally attached to an account id or name. Registering an account allows the user to save all favourite books unique to their account. Logging out, and signing in with a new account should result in loading different favourites. It seems unlikely that we will be able to save account information after the program has been terminated.

Also tied to your account should be both your search history and previously viewed books. The history should have 2 directories/tabs of their own to prevent crowding. If the user selects any previously searched entries, the user should be redirected to the search. Selecting a book in its history pulls up the individual display.


Platform:
Designed for Android and IOS, Android priority.

APIs: https://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=yYyHlpxh9hNIObhzKkBH4eirfaqEW3QW

https://www.googleapis.com/books/v1/volumes?q=9780743273565+isbn&maxResults=1


Directories/Nav:
Best Seller List
Search for Books (maybe also authors)
Register page/Login?
Favourites tab
History (Search, viewed, etc)


Target Audience:
Reading enthusiasts and the general public
The design should aim to be simple enough for a child to use.
