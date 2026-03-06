import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf"
import { createClient } from "@supabase/supabase-js"

// HuggingFace embeddings
const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: import.meta.env.VITE_HUGGINGFACE_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
  timeout: 10000
})

// Supabase credentials
const sbApiKey = import.meta.env.VITE_SUPABASE_API_KEY_BRAUHAUS
const sbUrl = import.meta.env.VITE_SUPABASE_URL_LC_CHATBOT_BRAUHAUS

const client = createClient(sbUrl, sbApiKey)

// Vector store
const vectorStore = new SupabaseVectorStore(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents"
})

// retriever
const retriever = vectorStore.asRetriever(4)

export { retriever }