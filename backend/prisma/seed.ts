import prisma from "../src/config/db";
import bcrypt from "bcryptjs";


async function main() {
    const hashedPassword = await bcrypt.hash("Demo123", 10);


  // 1️⃣ Create or find a demo user
  const alice = await prisma.user.upsert({
    
    where: { email: "Demo@prisma.io" },
    update: {},
    create: {
      email: "Demo@prisma.io",
      name: "Demo",
      password: hashedPassword,
    },
  });

  console.log("✅ User created:", alice.email);

  // 2️⃣ Seed multiple notes for the user
  const notesData = [
    {
      title: "Next.js Project Ideas",
      type: "document",
      content: JSON.stringify([
        "Portfolio Website",
        "Blog CMS",
        "SaaS Dashboard",
        "AI Note App",
      ]),
      description: "Ideas for building modern Next.js projects.",
      thumbnail: "",
      tags: ["#nextjs", "#ideas", "#projects"],
    },
    {
      title: "Understanding Prisma ORM",
      type: "document",
      content: JSON.stringify([
        "Data modeling",
        "CRUD operations",
        "Migrations",
        "Relations",
      ]),
      description: "A concise guide to using Prisma with Node.js.",
      thumbnail: "",
      tags: ["#nodejs", "#prisma", "#database"],
    },
    {
      title: "Tailwind CSS Tricks",
      type: "document",
      content: JSON.stringify([
        "Using gradients",
        "Responsive design",
        "Dark mode support",
      ]),
      description: "Useful Tailwind CSS tips for better UI design.",
      thumbnail: "",
      tags: ["#tailwind", "#design", "#frontend"],
    },
    {
      title: "Learning Express.js",
      type: "video",
      description: "A quick crash course on Express.js fundamentals.",
      thumbnail: "/videos/express-basics.jpg",
      tags: ["#express", "#backend", "#nodejs"],
    },
    {
      title: "The Power of GitHub Actions",
      type: "link",
      description:
        "Automate testing, deployment, and CI/CD workflows with GitHub Actions.",
      thumbnail: "/links/github-actions.jpg",
      tags: ["#devops", "#github", "#automation"],
    },
    {
      title: "React State Management",
      type: "document",
      content: JSON.stringify([
        "useState",
        "useReducer",
        "Context API",
        "Redux Toolkit",
      ]),
      description:
        "Comparison of popular state management techniques in React.",
      thumbnail: "",
      tags: ["#react", "#redux", "#frontend"],
    },
    {
      title: "Figma to React Workflow",
      type: "link",
      description:
        "How to efficiently convert Figma designs into React components.",
      thumbnail: "/links/figma-react.jpg",
      tags: ["#figma", "#react", "#ui"],
    },
    {
      title: "Best Free AI Tools for Developers",
      type: "document",
      content: JSON.stringify(["Cursor", "Bolt.new", "Loveable", "Blackbox AI"]),
      description: "A curated list of AI tools that help with development.",
      thumbnail: "",
      tags: ["#ai", "#tools", "#developers"],
    },
    {
      title: "Improve API Security",
      type: "tweet",
      description:
        "Never trust client input. Validate everything on the server. 🔐",
      tags: ["#api", "#security", "#backend"],
    },
    {
      title: "Git Commands Cheat Sheet",
      type: "document",
      content: JSON.stringify([
        "git clone",
        "git commit",
        "git push",
        "git rebase",
      ]),
      description: "Common Git commands for everyday use.",
      thumbnail: "",
      tags: ["#git", "#versioncontrol", "#devtips"],
    },
    {
      title: "Building REST APIs with TypeScript",
      type: "document",
      content: JSON.stringify([
        "Express setup",
        "Type safety",
        "Validation",
        "Error handling",
      ]),
      description: "Learn how to build scalable APIs with TypeScript.",
      thumbnail: "",
      tags: ["#typescript", "#backend", "#api"],
    },
    {
      title: "How to Stay Consistent",
      type: "quote",
      description: "“Discipline beats motivation.” — Anonymous",
      tags: ["#motivation", "#mindset"],
    },
    {
      title: "Useful React Libraries",
      type: "document",
      content: JSON.stringify([
        "React Hook Form",
        "Zustand",
        "Framer Motion",
        "TanStack Query",
      ]),
      description: "Libraries that make React development faster and cleaner.",
      thumbnail: "",
      tags: ["#react", "#libraries", "#frontend"],
    },
    {
      title: "Deploy Node App with Docker",
      type: "video",
      description: "Learn how to dockerize and deploy Node.js apps.",
      thumbnail: "/videos/docker-node.jpg",
      tags: ["#docker", "#deployment", "#nodejs"],
    },
    {
      title: "PostgreSQL vs MongoDB",
      type: "document",
      content: JSON.stringify([
        "SQL vs NoSQL",
        "Schema design differences",
        "Performance comparison",
      ]),
      description: "A detailed comparison between PostgreSQL and MongoDB.",
      thumbnail: "",
      tags: ["#database", "#postgresql", "#mongodb"],
    },
  ];

  await prisma.note.createMany({
    data: notesData.map((note) => ({
      ...note,
      userId: alice.id,
    })),
  });

  console.log(`✅ Seeded ${notesData.length} notes for ${alice.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("🌱 Seeding completed successfully!");
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
