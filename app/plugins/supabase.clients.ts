// plugins/supabase.client.ts
import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  
  const supabase = createClient(
    'https://kwfqyjtqpmrdamjsazps.supabase.co',
    'sb_publishable_JoLgb_kf1Mveq4rHxe4BZA_iSIE3Jct'
  )

  return {
    provide: {
      supabase
    }
  }
})