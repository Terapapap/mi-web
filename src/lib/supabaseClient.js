import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lsyzxziboqgdujpewgzq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzeXp4emlib3FnZHVqcGV3Z3pxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTQ0MzAsImV4cCI6MjA2NjE5MDQzMH0.uoHDYoStJ2cqxpl-tqcID73urmzuSCAucHIiZlyWrSs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);