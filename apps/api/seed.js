import dotenv from "dotenv";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import connectDB from "./src/config/db.js";
import Project from "./src/models/Project.js";
import Blog from "./src/models/Blog.js";
import SkillCategory from "./src/models/SkillCategory.js";
import Achievement from "./src/models/Achievement.js";
import Certificate from "./src/models/Certificate.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const normalizeIcon = (iconValue) => {
  if (!iconValue) {
    return "";
  }
  if (typeof iconValue === "string") {
    return iconValue;
  }
  return iconValue.displayName || iconValue.name || "";
};

const run = async () => {
  await connectDB();

  const dataFile = path.resolve(__dirname, "../web/src/data/index.js");
  const dataModule = await import(pathToFileURL(dataFile).href);

  const { PROJECTS, BLOGS, SKILLS_DATA, ACHIEVEMENTS, CERTIFICATES } = dataModule;

  await Promise.all([
    Project.deleteMany({}),
    Blog.deleteMany({}),
    SkillCategory.deleteMany({}),
    Achievement.deleteMany({}),
    Certificate.deleteMany({})
  ]);

  await Project.insertMany(
    PROJECTS.map((project, index) => ({
      title: project.title,
      role: project.role,
      image: project.image,
      description: project.description,
      impact: project.impact,
      tags: project.tags || [],
      links: project.links || {},
      order: index + 1
    }))
  );

  await Blog.insertMany(
    BLOGS.map((blog, index) => ({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content || "",
      date: blog.date,
      readTime: blog.readTime,
      tags: blog.tags || [],
      published: true,
      order: index + 1
    }))
  );

  const skillCategoryNames = Object.keys(SKILLS_DATA);
  await SkillCategory.insertMany(
    skillCategoryNames.map((category, index) => ({
      name: category,
      order: index + 1,
      skills: (SKILLS_DATA[category] || []).map((skill) => ({
        name: skill.name,
        icon: normalizeIcon(skill.icon),
        details: skill.details || ""
      }))
    }))
  );

  await Achievement.insertMany(
    ACHIEVEMENTS.map((achievement, index) => ({
      title: achievement.title,
      role: achievement.role,
      icon: normalizeIcon(achievement.icon),
      description: achievement.description,
      highlight: achievement.highlight || "",
      order: index + 1
    }))
  );

  await Certificate.insertMany(
    CERTIFICATES.map((certificate, index) => ({
      name: certificate.name,
      issuer: certificate.issuer,
      year: certificate.year,
      link: certificate.link,
      thumb: certificate.thumb || "",
      order: index + 1
    }))
  );

  console.log("Seed completed successfully");
  process.exit(0);
};

run().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
