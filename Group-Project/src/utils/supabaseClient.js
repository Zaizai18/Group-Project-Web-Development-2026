import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dgctrgjdkhmxthkwhxyp.supabase.co';
const supabaseAnonKey = 'sb_publishable_YSPCdd4cpBcaxsDFdJMbAg_EBXHOcTY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);