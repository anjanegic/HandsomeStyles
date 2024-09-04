import express from "express";
import User from "../models/user";
import Order from "../models/order";
import Review from "../models/review";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";

export class UserController {
  login = (req: express.Request, res: express.Response) => {
    let email = req.body.email;
    let password = req.body.password;

    /*
            let query = UserM.findOne({username: usernameP, password: passwordP});

            Mongoose queries are not promises. Queries are thenables. Code above is executed synchronously.

            Unlike promises, calling a query's .then() executes the query and it gets called immediately, 
            but execution is asynchronous and THEN CALLBACK is called after finish.

            Then function returs Promise, but we are not returning promises to front, 
            from then callback we are returning just data in response that is later inserted into Observable.
       */
    User.findOne({ email: email, password: password })
      .then((user) => {
        if (!user) {
          return res.json({ message: "User not found" });
        }
        if (!user.approved) {
          return res.json({ message: "Not approved" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeData = (req: express.Request, res: express.Response) => {
    let userId = req.body._id;
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let address = req.body.address;
    let city = req.body.city;
    let country = req.body.country;
    let postalCode = req.body.postalCode;
    let phone = req.body.phone;

    User.findByIdAndUpdate(
      userId,
      {
        $set: {
          email: email,
          firstname: firstname,
          lastname: lastname,
          address: address,
          city: city,
          country: country,
          postalCode: postalCode,
          phone: phone,
        },
      },
      { new: true }
    )
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  register = async (req: express.Request, res: express.Response) => {
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      email,
      password,
      firstname,
      lastname,
      type: "user",
      approved: false,
      deleted: false,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  };

  addToFavourites = (req: express.Request, res: express.Response) => {
    let datee = new Date();
    let dateStr =
      datee.getFullYear() +
      "-" +
      (datee.getMonth() + 1) +
      "-" +
      datee.getDate();
    let fav = {
      name: req.body.name,
      author: req.body.author,
      date: dateStr,
    };
    // @ts-ignore
    User.updateOne({ username: req.body.user }, { $push: { favourites: fav } })
      .then((data) => {
        res.json({ message: "Ok" });
      })
      .catch((err) => {
        res.json({ message: "Fail" });
      });
  };

  getUserByUsername = (req: express.Request, res: express.Response) => {
    let username = req.params.username;
    // @ts-ignore
    User.findOne({ username: username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => console.log(err));

    /*UserM.findOne({_id: "658c42827618b2cf3e3edae6"}).then(
                user=>{
                    res.json(user)
                }
            ).catch(err=>console.log(err))*/
  };

  changeFavourite = (req: express.Request, res: express.Response) => {
    let user = req.body.user;
    let bookname = req.body.bookname;

    /*UserM.updateOne({username: user},
        {$pull: {favourites: {name: bookname}}}).then(
                ok=>res.json({message: "Ok"})
        ).catch(err=>console.log(err))*/

    User.updateOne(
      // @ts-ignore
      { username: user },
      { $set: { "favourites.$[f].name": "Changed name" } },
      { arrayFilters: [{ "f.name": bookname }] }
    )
      .then((ok) => res.json({ message: "Ok" }))
      .catch((err) => console.log(err));
  };

  addToWishlist = (req: express.Request, res: express.Response) => {
    let productId = req.body.productId;
    let _id = req.body.userId;

    User.updateOne({ _id }, { $push: { wishlist: new ObjectId(productId) } })
      .then((data) => {
        console.debug(data);
        res.json({ message: "Ok" });
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Fail" });
      });
  };

  removeFromWishlist = (req: express.Request, res: express.Response) => {
    let productId = req.body.productId;
    let _id = req.body.userId;
    console.log(productId);

    User.updateOne({ _id }, { $pull: { wishlist: new ObjectId(productId) } })
      .then((data) => {
        console.debug(data);
        res.json({ message: "Ok" });
      })
      .catch((err) => {
        console.error(err);
        res.json({ message: "Fail" });
      });
  };

  addOrder = (req: express.Request, res: express.Response) => {
    let order = req.body;
    console.log(order);
    const newOrder = new Order(order);
    newOrder
      .save()
      .then((order) => {
        res.json(order);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  getOrders = (req: express.Request, res: express.Response) => {
    let userId = req.params.userId;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const theId = new Types.ObjectId(userId);

    Order.find({ userId: theId })
      .then((orders) => {
        res.json(orders);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  getReviews = (req: express.Request, res: express.Response) => {
    let userId = req.params.userId;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const theId = new Types.ObjectId(userId);

    Review.find({ userId: theId })
      .then((reviews) => {
        res.json(reviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  getUserById = (req: express.Request, res: express.Response) => {
    let userId = req.params.id;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const theId = new Types.ObjectId(userId);

    User.findById(theId)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  deleteReview = (req: express.Request, res: express.Response) => {
    let reviewId = req.body.reviewId;

    if (!Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ message: "Invalid review ID format" });
    }

    const theId = new Types.ObjectId(reviewId);

    Review.findByIdAndDelete(theId)
      .then((review) => {
        res.json(review);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  getNotApprovedUsers = (req: express.Request, res: express.Response) => {
    User.find({ approved: false })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  approveUser = (req: express.Request, res: express.Response) => {
    let userId = req.body.userId;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const theId = new Types.ObjectId(userId);

    User.findByIdAndUpdate(theId, { approved: true })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  getAllUsers = (req: express.Request, res: express.Response) => {
    User.find({ type: { $ne: "admin" } })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };

  deleteUser = (req: express.Request, res: express.Response) => {
    let userId = req.body.userId;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const theId = new Types.ObjectId(userId);

    User.findByIdAndDelete(theId)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        res.status(500).json({ message: "Internal server error" });
      });
  };
}
