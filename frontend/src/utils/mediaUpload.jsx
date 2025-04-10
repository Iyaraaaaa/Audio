import { createClient } from "@supabase/supabase-js";

const anon_key =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwb2diaGp1bmlxeW96d2luY21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4ODk3NzEsImV4cCI6MjA1NTQ2NTc3MX0.IVrcrFbJlnxVfV8nxexY6b8dTQvMbp3nMZFMCpl1650";
const supabase_url = "https://jpogbhjuniqyozwincmi.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
	return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

		const timestamp = new Date().getTime();
		const fileName = timestamp + file.name;

		supabase.storage
			.from("images")
			.upload(fileName, file, {
				cacheControl: "3600",
				upsert: false,
			})
			.then(() => {
				const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
					.data.publicUrl;
				resolve(publicUrl);
			}).catch(()=>{
                reject("Error uploading file")
            })
	});
}
