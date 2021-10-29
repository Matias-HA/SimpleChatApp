<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">Simple Chat App</h1>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#app-showcase">App Showcase</a></li>
        <li><a href="#short-description">Short Description</a></li>
        <li><a href="#features-overview">Features Overview</a></li>
        <li><a href="#folder-structure">Folder Structure</a></li>
        <li><a href="#main-libraries-used">Main Libraries Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>





<!-- ABOUT THE PROJECT -->
## About The Project

### App Showcase

<div align="center">
  <img src="https://user-images.githubusercontent.com/84104310/139360161-a9f5bb80-35f1-4f6b-bde5-74c2650b10f7.jpg" width="18%"></img>
  <img src="https://user-images.githubusercontent.com/84104310/139361866-577a3725-fd2f-450b-9ba5-e32a0b384d72.jpg" width="18%"></img>
  <img src="https://user-images.githubusercontent.com/84104310/139362204-3bb1af84-eade-4858-9733-a8d4cc98df57.jpg" width="18%"></img>
  <img src="https://user-images.githubusercontent.com/84104310/139362209-881a602e-defc-49b1-8b19-aaf881dc2a06.jpg" width="18%"></img>
  <img src="https://user-images.githubusercontent.com/84104310/139361640-ac08160d-2e12-4981-a2cd-a123e14c30e4.jpg" width="18%"></img>
</div>

### Short Description

This is a simple chat app. The app consists of three screens. a login screen, where the user can sign in using their google account. After signing in the user will be brought to the main screen, which gives an overview of each chat room the user can enter. After selecting a chat room the user will then be brought to the last screen, in which the user can chat with other people.

<b>Note that this app currently only works on android devices since I'm lacking the necessary development tools to build and test on iOS</b>

### Features Overview

- Splash screen.
- Log in using your google account.
- Bybass login screen if already signed in.
- A couple of different chat rooms to choose between.
- Send and view messages and images within each chat room.

### Folder Structure

Below is a general overview of how the project is structured. Any reuseable part, such as constants, hooks, components, colors and so on are placed under the shared folder. The navigation folder contains the sole component that handles navigation. The Screens folder consists of sub folders that each contain everything related to one specific screen. The components within each of the screen sub folders are built using the reusable elements from the shared folder whenever possible.

I have found that this way of structuring a project gives me the best overview while also clearly delineating what code belongs where.

    ├── src                   
    │   ├── navigation            # Navigation contains files related to managing navigation  
    │   ├── shared                # Contains anything that is reuseable by the main components (components, constants, custom hooks, queries, redux...)
    │   ├── screens               # The Screens folder contains every component that makes up a screen within the app
    │   │   ├── ChatRoom          # Contains the Chatroom screen component. Built using reusable parts from the shared folder along with child components specific to itself
    │   │   ├── Login             # Contains the Login screen component. Built using reusable parts from the shared folder along with child components specific to itself
    │   │   ├── Main              # Contains the Main screen component. Built using reusable parts from the shared folder along with child components specific to itself
    


### Main Libraries Used

Below I have listed the main libraries used for this project along with their purpose.

* []() Redux Toolkit for cleaner state management to avoid having to prop drill frequently used pieces of state.
* []() Firebase for handling login and firestore for storing infomation about users, chatrooms and messages sent.
* []() Styled Components for cleaner and more readable styling.
* []() The React Error Boundary library for an added extra layer of protection against unexpected errors which might have otherwise caused a crash.
* []() The React-Native-Size-Matters library to scale the UI such that it is consistent across larger and smaller devices. 


<!-- GETTING STARTED -->

## Getting Started

### Dependencies

If you haven't yet set up your development environment, follow the steps outlined in the documentation linked below

https://reactnative.dev/docs/environment-setup

### Installation

To get a local copy up and running follow these steps.

1. Clone the repo
   ```sh
   git clone https://github.com/Matias-HA/SimpleChatApp.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Verify Device Connection
   ```sh
   Run the "adb devices" command in a terminal to make sure your device is connected before running the following commands
   ```
3. Open a terminal and start Metro by running the command below inside your React Native project folder
   ```sh
   npx react-native start
   ```
4. Start the application by opening a second terminal and running the command below inside your React Native project folder
   ```sh
   npx react-native run-android
   ```
   
<!-- CONTACT -->

## Contact

My Name - Matias Hougaard Andreasen

Email - matias.hougaard.andreasen@gmail.com


<!-- MARKDOWN LINKS & IMAGES -->
