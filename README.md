### UPSTASH

Upstash is a serverless data platform that provides managed databases and messaging services without requiring you to manage servers. It is especially popular with Next.js, Vercel, Cloudflare Workers, and other serverless/edge applications.

Main Upstash Products
Upstash Redis
A serverless Redis-compatible database.
Commonly used for:
Caching
Session storage
Rate limiting
API response caching
Leaderboards
Supports both Redis protocol and HTTP/REST APIs.
Upstash Vector
A vector database for AI applications.
Stores embeddings for semantic search, RAG chatbots, and recommendation systems.
QStash
A serverless message queue and scheduler.
Lets you send jobs, schedule tasks, and retry failed requests automatically.
Workflow
Used for durable serverless workflows and background jobs.
Why Developers Like Upstash

✅ Serverless

No server setup.
No Redis installation.
No infrastructure management.

✅ Pay for What You Use

Pricing scales to zero.
Free tier available.
Good for personal projects and portfolios.

✅ Works Great with Next.js

Many tutorials use Upstash Redis for caching and rate limiting in Next.js applications.

✅ Edge Compatible

Uses HTTP APIs, making it work in environments where traditional Redis TCP connections are difficult.



### RabbitMQ docker conatiner name, image name and rabbitmq ui pass and username 
# 3. Now create your new container with the credentials you want
docker run -d --hostname rabbit-host --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  -e RABBITMQ_DEFAULT_USER=admin \
  -e RABBITMQ_DEFAULT_PASS=admin123 \
  rabbitmq:3-management

# 4. Confirm both containers exist, and the new one is running
docker ps -a



# ABOUT THE MULTER 

multer → Receives uploaded files from the client.
multer-storage-cloudinary → Sends those uploaded files directly to Cloudinary instead of saving them on your server.


| `multer`                    | Parses file uploads (`multipart/form-data`) and makes uploaded files available in Express (`req.file` or `req.files`). |

| `multer-storage-cloudinary` | A storage engine for `multer` that uploads files directly to Cloudinary instead of storing them on your server.        |
