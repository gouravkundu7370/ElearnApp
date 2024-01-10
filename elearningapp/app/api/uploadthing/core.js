const { auth } = require("@clerk/nextjs");
const { createUploadthing } = require("uploadthing/next");
const { isTeacher } = require("@/lib/teacher");

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isTeacher(userId);
  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId };
};

const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
};

module.exports = {
  ourFileRouter,
};
