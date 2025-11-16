import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocalization } from '../hooks/useLocalization';

const articles = {
  'download-vs-upload-speed': {
    title: "Understanding Internet Speeds: What’s the Difference Between Download and Upload?",
    description: "Ever wondered why your download speed is so much faster than your upload? We break down the key differences and explain which one matters most for your online activities.",
    content: () => (
      <div className="prose dark:prose-invert max-w-none">
        <p>When you run an internet speed test, you get two primary numbers: download and upload speed. While they might seem similar, they govern very different aspects of your online experience. Understanding the distinction is key to diagnosing issues and choosing the right internet plan.</p>
        
        <h3>What is Download Speed?</h3>
        <p>Think of download speed as the rate at which you can pull data from the internet to your device. It's like how quickly you can check a book out of a library. This is the metric that affects:</p>
        <ul>
          <li><strong>Streaming video and music:</strong> A higher download speed means less buffering when you're watching Netflix or listening to Spotify.</li>
          <li><strong>Loading websites:</strong> Pages with lots of images or videos will appear faster.</li>
          <li><strong>Downloading files:</strong> Grabbing that large software update or game will be much quicker.</li>
        </ul>
        <p>For most users, download speed is the more critical of the two, as we consume far more data than we send.</p>

        <h3>What is Upload Speed?</h3>
        <p>Upload speed is the opposite; it's the rate at which you can send data from your device to the internet. This is like returning a book to the library. Activities that rely heavily on upload speed include:</p>
        <ul>
          <li><strong>Video calls:</strong> A stable upload speed ensures others can see you clearly on Zoom or FaceTime without freezing.</li>
          <li><strong>Online gaming:</strong> Your actions are sent to the game server, so a fast upload speed can reduce lag.</li>
          <li><strong>Sending large files:</strong> Uploading a high-resolution video to YouTube or backing up photos to the cloud depends on this speed.</li>
        </ul>

        <h3>Why Are They Different?</h3>
        <p>Most consumer internet connections, like cable and DSL, are <strong>asymmetrical</strong>. This means they are designed to provide much faster download speeds than upload speeds. This design choice reflects typical internet usage, but as we do more video conferencing and content creation, the importance of upload speed is growing.</p>
        <p>Ultimately, the right balance depends on you. <Link to="/">Run a speed test</Link> to see your numbers and evaluate if your connection meets the demands of your digital life.</p>
      </div>
    )
  },
  'how-to-improve-wifi': {
    title: "8 Easy Tips to Boost Your Slow WiFi Speed",
    description: "Is slow WiFi driving you crazy? Before you call your ISP, try these simple, effective tips to improve your wireless signal and get faster speeds throughout your home.",
    content: () => (
      <div className="prose dark:prose-invert max-w-none">
        <p>Slow WiFi is a common frustration, but the solution is often within your control. Here are eight tips you can try right now to speed up your connection.</p>
        
        <ol>
          <li><strong>Find the Perfect Spot for Your Router:</strong> Your router should be in a central, elevated location, away from walls, metal objects, and appliances like microwaves that can cause interference.</li>
          <li><strong>Restart Your Router:</strong> The oldest trick in the book works for a reason. Rebooting your router clears its memory and can resolve many connection issues. Make it a weekly habit.</li>
          <li><strong>Secure Your Network:</strong> If your network isn't password-protected, neighbors could be using your bandwidth. Ensure you're using strong WPA2 or WPA3 security.</li>
          <li><strong>Switch to the 5GHz Band:</strong> Most modern routers are dual-band. The 5GHz band is faster and less congested than the 2.4GHz band, making it ideal for devices closer to the router that need high speed, like your TV or gaming console.</li>
          <li><strong>Use a Wired Connection:</strong> For critical devices like a gaming PC or a work computer, nothing beats the speed and stability of a direct Ethernet connection.</li>
          <li><strong>Update Your Router's Firmware:</strong> Manufacturers release updates that can improve performance and security. Check your router's admin page for the latest firmware.</li>
          <li><strong>Consider a WiFi Extender or Mesh System:</strong> If your home is large, a single router may not be enough. A WiFi extender can boost the signal to dead zones, while a mesh system provides seamless coverage everywhere.</li>
          <li><strong>Test Your Speed Regularly:</strong> Monitoring your speed helps you know if your changes are working and if you're getting the performance you pay for. <Link to="/">Test your speed now!</Link></li>
        </ol>
        <p>For more in-depth advice, check out our <Link to="/tips">WiFi Tips page</Link>.</p>
      </div>
    )
  },
  'speed-for-streaming-gaming': {
    title: "What Internet Speed Do You Really Need for Streaming and Gaming?",
    description: "More speed isn't always the answer. We break down the recommended speeds for smooth 4K streaming and competitive online gaming, and explain why low ping is the real MVP.",
    content: () => (
      <div className="prose dark:prose-invert max-w-none">
        <p>Choosing an internet plan can be confusing. Do you really need gigabit speeds? The answer depends on what you do online. Let's look at the requirements for two of the most demanding activities: streaming and gaming.</p>
        
        <h3>Internet Speed for Streaming</h3>
        <p>For video streaming, download speed is what matters. The higher the video quality, the more speed you need. Here are some general guidelines from services like Netflix:</p>
        <ul>
          <li><strong>HD (1080p):</strong> A minimum of 5-10 Mbps is recommended.</li>
          <li><strong>4K/UHD:</strong> You'll want at least 25 Mbps to stream in the highest quality without buffering.</li>
        </ul>
        <p>Remember, this is per device. If multiple people in your home are streaming at once, you'll need to add those requirements together.</p>

        <h3>Internet Speed for Gaming</h3>
        <p>For online gaming, the story is different. While a decent download speed (5-10 Mbps) is needed, two other factors are far more important: <strong>ping</strong> and <strong>jitter</strong>.</p>
        <ul>
          <li><strong>Ping (Latency):</strong> This is the time it takes for data to travel from your console to the game server and back. A low ping is essential for responsive gameplay. Look for a ping under 40ms for competitive gaming.</li>
          <li><strong>Jitter:</strong> This measures the consistency of your ping. High jitter means your connection is unstable, causing annoying lag spikes.</li>
        </ul>
        <p>A fast download speed won't save you from a high ping. A stable, low-latency connection is the key to a winning gaming experience. <Link to="/">Test your ping and speed</Link> on our homepage to see if your connection is ready for action.</p>
      </div>
    )
  }
};

const Blog = () => {
  const { slug } = useParams();
  const { t } = useLocalization();
  const article = slug ? articles[slug] : null;

  if (article) {
    return (
      <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-text-light dark:text-text-dark">{article.title}</h1>
        <div className="text-text-light dark:text-text-dark">{article.content()}</div>
        <Link to="/blog" className="inline-block mt-8 text-primary dark:text-primary-dark hover:underline">&larr; Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark">{t('blog.title')}</h1>
      <p className="text-text-muted-light dark:text-text-muted-dark mb-8">{t('blog.description')}</p>
      <div className="space-y-8">
        {Object.entries(articles).map(([key, articleData]) => (
          <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link to={`/blog/${key}`} className="text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors">{articleData.title}</Link>
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">{articleData.description}</p>
            <Link to={`/blog/${key}`} className="font-semibold text-primary dark:text-primary-dark hover:underline">{t('blog.read_more')} &rarr;</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
