const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1,2], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

// {
//     id: 1,
//     name: 'John Doe',
//     pastReservations: [
//     {
//          id: 1, parkId: 1, visitorId: 1, date: '2023-09-01' }
//     ],
//     upcomingReservations: [
//     {
//          id: 2, parkId: 2, visitorId: 1, date: '2023-10-01' }
//     ],
//     }

// Your routing, authentication, and controller code goes here
app.get("/parks", (req, res) => {
  if (parks) {
    res.json(parks);
  } else {
    res.status(404).json("parks not found");
  }
});
app.get("/parks/:id", (req, res) => {
  const selectedPark = parks.find((p) => p.id == req.params.id);
  if (selectedPark) {
    res.json(selectedPark);
  } else {
    res.status(404).json("park not found");
  }
});
app.get("/visitors", (req, res) => {
  if (visitors) {
    res.json(visitors);
  } else {
    res.status(404).json("visitors not found");
  }
});
app.get("/visitors/:id", (req, res) => {
  const selectedVisitor = visitors.find((v) => v.id == req.params.id);
  if (selectedVisitor) {
    let pReservations = [];
    let uReservations = [];
    for (let i = 0; i < selectedVisitor.pastReservations.length; i++) {
      const p = reservations.find(
        (r) => r.id == selectedVisitor.pastReservations[i]
      );
      if (p) {
        pReservations.push(p);
      }
    }
    for (let i = 0; i < selectedVisitor.upcomingReservations.length; i++) {
      const u = reservations.find(
        (r) => r.id == selectedVisitor.upcomingReservations[i]
      );
      if (u) {
        uReservations.push(u);
      }
    }
    const result = {
      ...selectedVisitor,
      pastReservations: pReservations,
      upcomingReservations: uReservations,
    };
    res.json(result);
  } else {
    res.status(404).json("visitor not found");
  }
});
app.get("/reservations", (req, res) => {
  if (reservations) {
    res.json(reservations);
  } else {
    res.status(404).json("reservations not found");
  }
});
app.get("/reservations/:id", (req, res) => {
  const selectedR = reservations.find((p) => p.id == req.params.id);
  if (selectedR) {
    res.json(selectedR);
  } else {
    res.status(404).json("reservation not found");
  }
});

app.listen(5000, () => {
  console.log("National Park Visitor System is running on port 5000");
});
