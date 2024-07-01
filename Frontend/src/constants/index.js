import {discord,reddit,amazon,patreon, 
  login_idle,
  login_active,
  signup_idle,
  signup_active,} from "../assets"


export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "about",
    title: "About",
  },
  {
    id: "games",
    title: "Games",
  },
  {
    id: "support",
    title: "Support",
  },
];

export const login = [
  {
    id:"login",
    idle: login_idle,
    active: login_active
  },
  {
    id: "signup",
    idle: signup_idle,
    active: signup_active
  }
] 

export const gameContexts = [
  {
    id: 0,
    name: "Two Distinct Worlds",
    shortName: "tdw",
    text: "In \"Two Distinct Worlds,\" players are immersed in a gripping narrative set in a parallel universe where magic and technology coexist, shaping two distinct realms. The game follows the journey of two protagonists, Alex and Kira, who accidentally discover a portal connecting their worlds. Alex, a brilliant scientist from the technologically advanced world, and Kira, a skilled mage from the realm of magic, must navigate the challenges of each other's worlds to unravel a mysterious conspiracy threatening both dimensions. As players progress through the game, they uncover the secrets behind the convergence of these two worlds and the ancient prophecy that foretells the fate of their intertwined destinies. Along the way, Alex and Kira forge alliances, confront powerful adversaries, and master the unique abilities of their respective realms. The choices players make impact the story, leading to multiple endings and a rich, immersive experience.",
    state:"released",
    appCode: "000000"
  },
  {
    id: 1,
    name: "Rift In The Universe",
    shortName: "rtu",
    text: "Picking up where \"Two Distinct Worlds\" left off, \"Rift In The Universe\" delves deeper into the consequences of the portal's existence. The delicate balance between magic and technology is disrupted, causing catastrophic rifts that threaten to tear both worlds apart. Players take control of a new protagonist, a skilled interdimensional traveler named Elysia, who is tasked with repairing the fabric of reality and preventing a full-scale war between the two realms. Elysia must navigate through treacherous landscapes, uncover ancient artifacts, and confront powerful beings who seek to exploit the chaos for their own gain. As the story unfolds, players discover the origins of the rift and the dark forces manipulating events from the shadows. The choices made by Elysia impact the delicate equilibrium between magic and technology, shaping the future of both worlds.",
    state:"released",
    appCode: "000000"
  },
  {
    id: 2,
    name: "Living In The Past",
    shortName: "ltp",
    text: "Embark on a captivating journey with Olivia Grey, a skilled archaeologist in her 30s who stumbles upon mysterious anomalies during an excavation. Transported back to her 20s, Olivia discovers a world shaped by the lingering consequences of past events in \"Two Distinct Worlds\" and \"Rift In The Universe.\"    As Olivia navigates her contemporary surroundings, players unravel the enigma behind the anomalies, seamlessly blending elements of magic and technology. The game introduces a dynamic environment where the delicate balance of both realms hangs in the balance.    Guided by player choices, Olivia's unique ability to traverse between magical and technological dimensions becomes essential. Encounter characters from the previous games, each with their own roles in the unfolding narrative. Explore a visually stunning world where the past, present, and future collide.\"Living In The Past\" is a standalone experience, offering players a chance to shape Olivia's destiny without revealing the full extent of the mysteries that threaten the interconnected universes. Dive into an epic adventure where time, magic, and technology converge, setting the stage for a climactic confrontation and the restoration of balance to the universe. The game is a work in progress, promising an immersive narrative that leaves players eager for the untold secrets yet to be unveiled.",
    state:"wip",
    appCode: "000000"
  },
];


// wip = work in progress

export const supportWays = [
  {
    title: "Spread the Word",
    text: "Help us reach a wider audience by sharing your experiences with our games on social media. Whether it's a screenshot, gameplay video, or a heartfelt review, your voice matters. Use our official hashtags and tag us to join the conversation.",
    links: null,
    icons: null,
    icons_bg: null
  },
  {
    title: "Join our Community",
    text: "Connect with fellow gamers and enthusiasts in our vibrant community forums. Share strategies, discuss plot twists, and exchange ideas for the future. Your insights shape the direction of our games, and we love hearing from you.",
    links: ["https://discord.com/","https://www.reddit.com/"],
    icons: [discord,reddit],
    icons_bg: ["white","orange-400"]
  },
  {
    title: "Exclusive Merchandise",
    text: "Show your support in style with our exclusive merchandise. From limited-edition apparel to collectibles, our store offers a range of items that let you carry a piece of our worlds with you. Every purchase directly contributes to the development of future projects.",
    links: ["https://www.amazon.com/"],
    icons: [amazon],
    icons_bg: ["white"]
  },
  {
    title: "Become a Patron",
    text: "For those who want to take their support to the next level, consider becoming a patron. Gain access to behind-the-scenes content, early previews, and exclusive perks. Your contributions directly impact the quality and depth of our games.",
    links: ["https://www.patreon.com/"],
    icons: [patreon],
    icons_bg: ["[rgb(249,102,82)]"]
  },
  {
    title: "Feedback and Suggestions",
    text: "We value your feedback. Let us know what you loved about our games and where we can improve. Your insights are invaluable in refining our storytelling and gameplay mechanics. Together, we can create even more captivating experiences.",
    links: "contact",
    icons: null,
    icons_bg: null
  },
  {
    title: "Collaborate with Us ",
    text: "Are you a content creator, artist, or someone with a unique skill set? We're always open to collaborations. Reach out to us with your ideas, and let's explore exciting possibilities together.",
    links: "contact",
    icons: null,
    icons_bg: null
  },
  {
    title: "Financial Contributions",
    text: "If you believe in our vision and want to support us financially, consider making a direct contribution. Every dollar goes towards enhancing the quality of our games and bringing more stories to life.",
    links: "contact",
    icons: null,
    icons_bg: null
  },
]

/*
Thank you for being a part of our journey in crafting immersive worlds and unforgettable experiences. Your support is crucial in fueling our passion for game development and storytelling. Here are various ways you can contribute and become a valued member of our community:

1. Spread the Word
Help us reach a wider audience by sharing your experiences with our games on social media. Whether it's a screenshot, gameplay video, or a heartfelt review, your voice matters. Use our official hashtags and tag us to join the conversation.

2. Join our Community
Connect with fellow gamers and enthusiasts in our vibrant community forums. Share strategies, discuss plot twists, and exchange ideas for the future. Your insights shape the direction of our games, and we love hearing from you.

3. Exclusive Merchandise
Show your support in style with our exclusive merchandise. From limited-edition apparel to collectibles, our store offers a range of items that let you carry a piece of our worlds with you. Every purchase directly contributes to the development of future projects.

4. Become a Patron
For those who want to take their support to the next level, consider becoming a patron. Gain access to behind-the-scenes content, early previews, and exclusive perks. Your contributions directly impact the quality and depth of our games.

5. Feedback and Suggestions
We value your feedback. Let us know what you loved about our games and where we can improve. Your insights are invaluable in refining our storytelling and gameplay mechanics. Together, we can create even more captivating experiences.

6. Collaborate with Us
Are you a content creator, artist, or someone with a unique skill set? We're always open to collaborations. Reach out to us with your ideas, and let's explore exciting possibilities together.

7. Financial Contributions
If you believe in our vision and want to support us financially, consider making a direct contribution. Every dollar goes towards enhancing the quality of our games and bringing more stories to life.

Your support means the world to us. As we continue to explore new realms and create unforgettable adventures, we're grateful to have you by our side. Together, let's shape the future of gaming.
*/