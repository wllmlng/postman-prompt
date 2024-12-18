# 🚀 Getting Started

## 📦 Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

# 📊 API Performance Dashboard

## 🎯 Objective

Design and implement a data visualization component that represents the performance and health of various APIs within the Postman platform.

## 💻 Technology Stack

- **Front-end Framework**: React
- **Visualization Library**: Highcharts
- **Virtualization Library**: ReactVirtualized
- **AI Library**: Anthropic
- **Styling**: SCSS
- **Icons**: FontAwesome

## 📊 Details

### Thought Process

1. **Design Inspiration**:
   - I took inspiration from the design aesthetics of **Stripe** and **New Relic**. Their clean and modern interfaces influenced my approach to creating a visually appealing dashboard.

2. **Simplicity in Design**:
   - Given the large volume of data to represent, I focused on a simplistic design and color scheme. This helps to emphasize the delivery of information without overwhelming the user.

3. **Primary Goals for Data Visualization**:
   - I concentrated on the primary goals of the data visualization, ensuring that the most critical metrics are easily accessible and understandable.

4. **Stackable Filters**:
   - I wanted the filters to be stackable, allowing users to drill down into specific details. This feature enhances the user experience by providing more granular control over the data displayed.

5. **Virtualized Components**:
   - To improve browser performance, I implemented virtualization for the table and dropdown lists. This approach ensures that only the visible items are rendered, reducing the load on the browser.

6. **Simulated Data Loading**:
   - I used a `setTimeout` function to simulate loading the data. This provides a realistic experience for users, mimicking the time it might take to fetch data from an API.

7. **Dynamic Summary Section**:
   - The summary section is dynamic and updates based on the filter selection. This feature gives users quick insights into the overall health of the APIs, making it easier to assess performance at a glance.

8. **AI Tool for Fun**:
   - The AI tool is included more for fun and serves as a quick way to provide analysis. While it may not be the core focus, it adds an interesting element to the dashboard.
