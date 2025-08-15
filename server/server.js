const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

const getUserList = async (username) => {
  const query = `
    query ($userName: String, $type: MediaType) {
      MediaListCollection(userName: $userName, type: $type) {
        user {
          id
          name
        }
        lists {
          name
          entries {
            media {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
              }
            }
            score
            status
          }
        }
      }
    }
  `;

  const variables = { userName: username, type: "ANIME" };

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    const mediaList = data.data.MediaListCollection;
    if (!mediaList || !mediaList.lists) return []; 

    const completedList = mediaList.lists.find(list => list.name === "Completed");
    if (!completedList) return [];

    // Sort by English title
    const sortedEntries = completedList.entries
      .filter(entry => entry.media.title.english) 
      .sort((a, b) => a.media.title.english.localeCompare(b.media.title.english));

    return sortedEntries;
  } catch (err) {
    console.error(err);
    return [];
  }
};

app.post("/getAnime", async (req, res) => {
  const entry_one = await getUserList(req.body.name);
  const entry_two = await getUserList(req.body.name_two);
  const title2 = new Set(entry_two.map(obj => obj.media.title.english));
  common_entry_one = entry_one.filter(obj => title2.has(obj.media.title.english));

  const title1 = new Set(entry_one.map(obj => obj.media.title.english));
  common_entry_two = entry_two.filter(obj => title1.has(obj.media.title.english));

  const user_one = {
    completed: common_entry_one,
    username: req.body.name
  }

  const user_two = {
    completed: common_entry_two,
    username: req.body.name_two
  }

  var entries = [user_one,user_two];
  res.json(entries);
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
