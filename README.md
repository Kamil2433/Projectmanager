deployed link- https://kamil2433.github.io/Projectmanager/


backend server- https://projectmanager-9kdh.onrender.com

testaccount 1(admin)-

Login- test

password- test

testaccount 2(team_member)- 

Login- test1

password- test1

dashboard-
<img width="948" alt="image" src="https://github.com/user-attachments/assets/774c9fd5-2083-4692-9606-acad2781f31e">

Login page- 

<img width="860" alt="image" src="https://github.com/user-attachments/assets/865d5556-afdb-4643-a3a2-741b58ce87b2">

Demo Video-

https://youtu.be/NS5dkaf44yw

Project description-
I developed a robust Project Manager application designed to simplify task management and project tracking, featuring modern drag-and-drop functionality for seamless task organization. The application utilizes JWT authentication to ensure secure user sessions and protect sensitive data. Built on a Node.js backend and a frontend designed with meticulous attention to layout, typography, and theming, the platform offers an intuitive and visually cohesive experience for users. The drag-and-drop feature empowers users to dynamically update task statuses within a project grid, ensuring real-time task flow management without compromising usability or performance.

The application employs role-based access control to manage user permissions effectively. Only administrators have privileges to edit or delete projects, while team members can access and interact with projects that include tasks assigned to them. Tasks can be updated through drag-and-drop operations, streamlining team workflows. The backend is highly scalable, making it capable of handling growing teams and complex project data. This scalability ensures that as teams expand, the platform can accommodate increased load without compromising performance or reliability. Overall, the Project Manager delivers a powerful tool for teams to collaborate efficiently, with a focus on secure, responsive, and user-friendly design principles.


Error Logging with Winston:
To enhance application reliability and simplify debugging, I added a custom logError function for comprehensive error logging. The logging system is powered by Winston, configured to handle:

Console Logging with colored output for better readability.
Daily Log Rotation to maintain organized log files.
Handling Unhandled Exceptions and Rejections: Automatically logs critical errors, ensuring no issue goes unnoticed.


Role based access-
1. Admin- Admin can create, update, delete all the projects and tasks
2. Team member- Team member can only read the projects which have tasks in them which as assigned to team member



Setting up project locally-
Frontend-
1. npm i
2. npm run dev

Backend-
cd ./backend
1. npm i
2. node index.js









