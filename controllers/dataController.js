import axios from "axios";

export const getData = async (req, res) => {
  try {
    const { category, limit } = req.query;
    let url = `https://api.publicapis.org/entries`;

    //check if category is provided
    if (category) {
      url += `?category=${category}`;
    }

    const response = await axios.get(url);
    console.log(response.data);

    //if entries.length is 0, return a message to the user
    if (response.data.count === 0) {
      return res.status(200).json({
        message: `No entries found for the category: ${category}`,
      });
    }

    // If limit is provided, return only the specified number of entries
    if (limit) {
      const entries = response.data.entries.slice(0, limit);
      return res.status(200).json({ count: entries.length, entries });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const url = "https://api.publicapis.org/categories";
    const response = await axios.get(url);

    //handling edge cases
    if (!response) throw new Error("No data found");
    if (response.data.count === 0) {
      return res.status(200).json({
        message: "No categories found",
      });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
};
