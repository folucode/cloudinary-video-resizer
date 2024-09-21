import styles from './page.module.css';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '@/lib/cloudinary';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';

export default function Home() {
  const handleSubmit = async (formData: FormData) => {
    'use server';

    const file = formData.get('video') as File;
    const aspect_ratio = formData.get('format') as string;

    const buffer: Buffer = Buffer.from(await file.arrayBuffer());

    let url: string = '';

    try {
      const base64Image: string = `data:${file.type};base64,${buffer.toString(
        'base64'
      )}`;

      const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
        base64Image,
        {
          resource_type: 'video',
          transformation: [{ aspect_ratio, crop: 'fill' }],
          public_id: `videos/${Date.now()}`,
        }
      );

      url = uploadResult.secure_url;
    } catch (error: any) {
      console.error(error);
    }

    redirect(url);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles['upload-form']}>
          <h2>Upload and Resize Your Video</h2>
          <form action={handleSubmit}>
            <div className={styles['form-group']}>
              <label htmlFor='video'>Upload Video:</label>
              <input type='file' name='video' accept='video/*' required />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor='format'>Formats:</label>
              <select name='format'>
                <option value='9:16'>Instagram Reels</option>
                <option value='1:1'>Instagram Feed</option>
                <option value='9:16'>TikTok</option>
                <option value='9:16'>YouTube Shorts</option>
                <option value='16:9'>YouTube Standard</option>
                <option value='9:16'>Facebook Stories</option>
                <option value='1:1'>Facebook Feed</option>
                <option value='9:16'>Snapchat</option>
                <option value='1:1'>Twitter/X</option>
                <option value='1:1'>LinkedIn</option>
              </select>
            </div>

            <SubmitButton />
          </form>
        </div>
      </main>
    </div>
  );
}
