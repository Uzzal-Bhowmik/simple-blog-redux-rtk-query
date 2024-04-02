import { sub } from "date-fns";

const blogs = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
  {
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
  },
  {
    id: 6,
    title: "dolorem eum magni eos aperiam quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae",
  },
  {
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas",
  },
  {
    id: 8,
    title: "dolorem dolore est ipsam",
    body: "dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae",
  },
  {
    id: 9,
    title: "nesciunt iure omnis dolorem tempora et accusantium",
    body: "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas",
  },
  {
    id: 10,
    title: "optio molestias id quia eum",
    body: "quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error",
  },
];

const authors = [
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Zboyislav",
      last: "Yakubovich",
    },
    location: {
      street: {
        number: 7009,
        name: "Transportna ploshcha",
      },
      city: "Vizhnicya",
      state: "Hmelnicka",
      country: "Ukraine",
      postcode: 72574,
      coordinates: {
        latitude: "76.2332",
        longitude: "-65.8829",
      },
      timezone: {
        offset: "+7:00",
        description: "Bangkok, Hanoi, Jakarta",
      },
    },
    email: "zboyislav.yakubovich@example.com",
    login: {
      uuid: "6fcbe2eb-9824-40d6-8b44-169a4ac3182a",
      username: "crazyfish204",
      password: "prelude",
      salt: "KFjqd2zd",
      md5: "fbd1ab71c6d4027fed4fa343bea4bc47",
      sha1: "9fcc8d02310eadd60ea2b7955704022c84ca78d2",
      sha256:
        "0017ca35012c7a82434e6999a965a35e9b5c65ab1db76c65f5f618f39fd4ad2a",
    },
    dob: {
      date: "1967-02-27T15:35:45.047Z",
      age: 57,
    },
    registered: {
      date: "2013-09-22T14:05:00.934Z",
      age: 10,
    },
    phone: "(067) Q72-0516",
    cell: "(096) D46-4368",
    id: {
      name: "",
      value: null,
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/65.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/65.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/65.jpg",
    },
    nat: "UA",
  },
  {
    gender: "female",
    name: {
      title: "Ms",
      first: "Maryam",
      last: "Ringvold",
    },
    location: {
      street: {
        number: 3617,
        name: "Wilhelm Stenersens vei",
      },
      city: "Lyefjell",
      state: "Sogn og Fjordane",
      country: "Norway",
      postcode: "5229",
      coordinates: {
        latitude: "-11.3101",
        longitude: "-132.6239",
      },
      timezone: {
        offset: "+5:45",
        description: "Kathmandu",
      },
    },
    email: "maryam.ringvold@example.com",
    login: {
      uuid: "7a64adcf-aaec-45f7-bda3-fe089bceed1a",
      username: "whitetiger879",
      password: "server",
      salt: "Qo84bILR",
      md5: "3b4f74043583d12b7720714c8214bcd7",
      sha1: "d8616223233106149f325a97d04faf79a62cb8bb",
      sha256:
        "5f024422c688fa471c3fef8bf5d4e50827e28d8cf243b01ce40eba17468cfbf1",
    },
    dob: {
      date: "1950-11-20T18:55:39.081Z",
      age: 73,
    },
    registered: {
      date: "2015-04-27T10:22:34.494Z",
      age: 8,
    },
    phone: "58198655",
    cell: "42734221",
    id: {
      name: "FN",
      value: "20115008812",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/40.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/40.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/40.jpg",
    },
    nat: "NO",
  },
  {
    gender: "male",
    name: {
      title: "Monsieur",
      first: "Nicholas",
      last: "Pierre",
    },
    location: {
      street: {
        number: 9956,
        name: "Rue de L'Abbé-Migne",
      },
      city: "Herisau",
      state: "Graubünden",
      country: "Switzerland",
      postcode: 4596,
      coordinates: {
        latitude: "-15.3358",
        longitude: "-51.4777",
      },
      timezone: {
        offset: "+1:00",
        description: "Brussels, Copenhagen, Madrid, Paris",
      },
    },
    email: "nicholas.pierre@example.com",
    login: {
      uuid: "d2fd9992-3b67-4342-9827-bd7f8659a9c1",
      username: "purplefrog783",
      password: "777777",
      salt: "OJWgXkdS",
      md5: "c3f720523fd95d6ff0ee69d0675763a8",
      sha1: "401a9cb261ed0cf22b2c9dc51236fcae3b713220",
      sha256:
        "3d7f0abb1e55c72282e040396419f79cd1e63576731f06030b859d3bac16cb61",
    },
    dob: {
      date: "1976-06-19T22:32:57.298Z",
      age: 47,
    },
    registered: {
      date: "2017-04-18T03:19:15.487Z",
      age: 6,
    },
    phone: "075 659 63 55",
    cell: "076 504 95 02",
    id: {
      name: "AVS",
      value: "756.5907.9752.92",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/0.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/0.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/0.jpg",
    },
    nat: "CH",
  },
  {
    gender: "male",
    name: {
      title: "Mr",
      first: "Parv",
      last: "Gamskar",
    },
    location: {
      street: {
        number: 2551,
        name: "Old Jail Rd",
      },
      city: "Bahraich",
      state: "Haryana",
      country: "India",
      postcode: 32249,
      coordinates: {
        latitude: "52.5314",
        longitude: "-119.6755",
      },
      timezone: {
        offset: "+5:00",
        description: "Ekaterinburg, Islamabad, Karachi, Tashkent",
      },
    },
    email: "parv.gamskar@example.com",
    login: {
      uuid: "0b0a5c8b-063a-49fa-9883-907f9039f0be",
      username: "heavykoala943",
      password: "deep",
      salt: "oh7WL5tv",
      md5: "c760db071b9ac23a446aea41f6ce670e",
      sha1: "e75a1c12775db70ea66527d43ed15d2265d6ea9e",
      sha256:
        "97891093097ab4bb22bc53fdec59750fa9717533fda07ee3bd2af4ec53488e5c",
    },
    dob: {
      date: "1987-04-24T21:25:29.289Z",
      age: 36,
    },
    registered: {
      date: "2019-03-28T10:47:21.362Z",
      age: 5,
    },
    phone: "9410752453",
    cell: "9140900037",
    id: {
      name: "UIDAI",
      value: "545036560202",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/men/18.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/18.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/18.jpg",
    },
    nat: "IN",
  },
  {
    gender: "female",
    name: {
      title: "Mrs",
      first: "Kristin",
      last: "Arnold",
    },
    location: {
      street: {
        number: 6591,
        name: "Dane St",
      },
      city: "Bunbury",
      state: "Queensland",
      country: "Australia",
      postcode: 1878,
      coordinates: {
        latitude: "41.7574",
        longitude: "17.6144",
      },
      timezone: {
        offset: "-5:00",
        description: "Eastern Time (US & Canada), Bogota, Lima",
      },
    },
    email: "kristin.arnold@example.com",
    login: {
      uuid: "4f480b4b-4915-4332-ac9e-45476ecd2b72",
      username: "heavykoala832",
      password: "charles1",
      salt: "w1CXv9wD",
      md5: "20f9b67467137f65713d51004db9d507",
      sha1: "4d1ebe69272b2770e611880655fdc47f2877d379",
      sha256:
        "ef23b65d60bf866e4fdc39709094168edb8e0a81a05fb37b4ecfb56795c1a166",
    },
    dob: {
      date: "1950-09-18T08:09:15.629Z",
      age: 73,
    },
    registered: {
      date: "2009-08-20T01:15:04.110Z",
      age: 14,
    },
    phone: "04-0968-0064",
    cell: "0470-565-260",
    id: {
      name: "TFN",
      value: "055920085",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/7.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/7.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/7.jpg",
    },
    nat: "AU",
  },
  {
    gender: "female",
    name: {
      title: "Miss",
      first: "Emily",
      last: "Lavoie",
    },
    location: {
      street: {
        number: 1756,
        name: "St. Catherine St",
      },
      city: "St. Antoine",
      state: "Manitoba",
      country: "Canada",
      postcode: "A3M 8M5",
      coordinates: {
        latitude: "-87.2349",
        longitude: "79.4711",
      },
      timezone: {
        offset: "+9:00",
        description: "Tokyo, Seoul, Osaka, Sapporo, Yakutsk",
      },
    },
    email: "emily.lavoie@example.com",
    login: {
      uuid: "83786b27-1f11-406b-9680-598904040980",
      username: "purplegoose500",
      password: "pepsi1",
      salt: "8mxWwBH7",
      md5: "7de85a8934724493cb98c2b303f06253",
      sha1: "8dcfca77e93d02a638a560b7bdee005ee2fbd865",
      sha256:
        "aeae10398482ab85cb91b4236750f06e54f190473636e235d4fa7c8432a0338e",
    },
    dob: {
      date: "1959-06-14T23:02:14.538Z",
      age: 64,
    },
    registered: {
      date: "2015-02-11T21:56:54.210Z",
      age: 9,
    },
    phone: "F43 H58-9659",
    cell: "D76 N97-2099",
    id: {
      name: "SIN",
      value: "093793545",
    },
    picture: {
      large: "https://randomuser.me/api/portraits/women/81.jpg",
      medium: "https://randomuser.me/api/portraits/med/women/81.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/women/81.jpg",
    },
    nat: "CA",
  },
];

const categories = [
  "Arts & Culture",
  "Food & Cooking",
  "Travel",
  "Love & Tragedy",
  "Fun Blog",
  "Knowledge Enrichment",
  "Enchanting",
];

const updateBlogs = () => {
  const udpatedBlogs = blogs.map((blog) => {
    let min = 1;
    const randomNum = Math.ceil(Math.random() * 5);

    if (randomNum) {
      const authorName =
        authors[randomNum]?.name.first + " " + authors[randomNum]?.name.last;
      const authorPic = authors[randomNum]?.picture.large;
      const date = sub(new Date(), { minutes: min++ }).toISOString();
      const reactions = {
        like: 0,
        love: 0,
        fire: 0,
        sad: 0,
        angry: 0,
      };
      const category = categories[randomNum];
      const featured = (randomNum * randomNum + 23) % 2 === 0 && true;

      const thumbnail =
        "https://nordthemes.com/the-lifestyle/wp-content/uploads/sites/12/2017/05/clarisse-meyer-279811s.jpg";

      return {
        author: {
          authorId: randomNum,
          authorName,
          authorPic,
        },
        ...blog,
        category,
        thumbnail,
        date,
        featured,
        reactions,
      };
    }
  });

  console.log(JSON.stringify(udpatedBlogs));
};

updateBlogs();
