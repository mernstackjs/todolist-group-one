import { createClient } from '@supabase/supabase-js';

export default class HttpClient {
  constructor() {
    this.supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
    this.supabaseKey =
      import.meta.env.VITE_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    this.client = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async signInWithEmail(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  async signUp(email, password) {
    const { data, error } = await this.client.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  async signOut() {
    const { error } = await this.client.auth.signOut();
    return error;
  }

  async getCurrentUser() {
    const {
      data: { user },
    } = await this.client.auth.getUser();
    return user;
  }

  async getTasks() {
    const { data, error } = await this.client.from('todos').select('*');
    return { data, error };
  }

  async deleteTask(id) {
    const { error } = await this.client.from('todos').delete().eq('id', id);
    return error;
  }

  async updateTask(id, taskObj) {
    const { data, error } = await this.client
      .from('todos')
      .update({
        title: taskObj.title,
        description: taskObj.description,
        date: taskObj.date,
      })
      .eq('id', id)
      .select();
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
