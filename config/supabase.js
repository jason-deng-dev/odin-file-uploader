import { createClient } from '@supabase/supabase-js'


// Create Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default supabase;




// Upload file using standard upload
async function uploadFile(file) {
  const { data, error } = await supabase.storage.from('bucket_name').upload('file_path', file)
  if (error) {
    // Handle error
  } else {
    // Handle success
  }
}

// get url
const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')