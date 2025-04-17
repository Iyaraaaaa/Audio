import { createClient } from "@supabase/supabase-js";
const anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rc2Z4bHNxbGt3YnhnbGlraXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NDU3NDgsImV4cCI6MjA1NzMyMTc0OH0.fJDDz3UjpWZjqasCcn27ZUg1e22UxfphNMZEFZ6E4GA";

const supabase_Url = " https://mksfxlsqlkwbxglikixi.supabase.co";
const supabase = createClient(supabase_Url, anon_key);
export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    }

    const timestamp = new Date().getTime();
    const filename = timestamp + file.name;

    supabase.storage
      .from("images")
      .upload(file.name, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage
          .from("images")
          .getPublicUrl(file.name).data.publicUrl;
        console.log(publicUrl);
      })
      .catch(() => {
        reject("Error uploading file");
      });
  });
}
