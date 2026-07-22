import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kxccdhjuvlxkpqedudur.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4Y2NkaGp1dmx4a3BxZWR1ZHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTc2ODcsImV4cCI6MjA5OTE3MzY4N30.W6no3NeEwYYJDRFAgSSJTwnAmfQfE6o6KMikuce2YiQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
