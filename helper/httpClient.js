import { createClient } from '@supabase/supabase-js';

export default class HttpClient {
  constructor() {
    this.supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    this.supabaseKey =
      import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    this.client = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async getTasks() {
    const { data, error } = await this.client.from('todos').select('*');
    return { data, error };
  }

  async addTask(taskObj) {
    const user = await this.getCurrentUser();
    if (!user) return { data: null, error: { message: 'Logga in först' } };

    const { data, error } = await this.client
      .from('todos')
      .insert([
        {
          title: taskObj.title,
          description: taskObj.description,
          date: taskObj.date,
          user_id: user.id,
        },
      ])
      .select();
    return { data, error };
  }
}