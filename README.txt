Bridge4Meal — quick start

1) FRONTEND
- Files: index.html, styles.css, script.js in /bridge4meal_site
- Open index.html in your browser to preview.
- Deploy on Netlify/Vercel/GitHub Pages by uploading these three files.

2) BACKEND (optional, to make forms work)
- Requires Node.js installed.
- Create a folder for backend and save server.js.
- Run:
  npm init -y
  npm i express cors
  node server.js
- Update API_BASE in script.js to your backend URL (default http://localhost:8800/api).
- Forms: POST /api/partners, /api/workers, /api/messages

3) IMAGES (place into /assets):
- hero.jpg — wide banner
- about.jpg — community/food distribution
- worker.jpg — verified worker
- volunteer.jpg — volunteers sorting food
- favicon.png — small icon

Suggested HD image links (download and save with the above names):
- Hero: https://images.unsplash.com/photo-1509099836639-18ba1795216d
- About: https://images.unsplash.com/photo-1558642452-9d2a7deb7f62
- Worker: https://images.unsplash.com/photo-1517245386807-bb43f82c33c4
- Volunteer: https://images.unsplash.com/photo-1519337265831-281ec6cc8514
- (You can also search Unsplash: 'food donation', 'restaurant kitchen team', 'volunteer sorting food', 'delivery logistics')

4) WHERE TO PUT PICTURES
- Put all images in /assets folder next to index.html.
- Replace the placeholder image file names if you choose different ones.

5) CUSTOMIZATION
- Edit colors in styles.css under :root variables.
- Change texts and sections directly in index.html.
- Replace metrics targets in #impact by changing data-target numbers.

6) SECURITY/PROD NOTES
- Add server-side validation and a database for real use.
- Add CAPTCHA to reduce spam.
- Serve HTTPS in production.
