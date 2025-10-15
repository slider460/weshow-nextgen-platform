import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getNews, getNewsStats } from '../api/news';
import { getBlogPosts, getBlogStats } from '../api/blog';
import { News, BlogPost } from '../types/database';

const TestAPI: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [newsStats, setNewsStats] = useState<any>(null);
  const [blogStats, setBlogStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testAPI();
  }, []);

  const testAPI = async () => {
    try {
      setLoading(true);
      setError(null);

      const [newsData, blogData, newsStatsData, blogStatsData] = await Promise.all([
        getNews({ status: 'published' }),
        getBlogPosts({ status: 'published' }),
        getNewsStats(),
        getBlogStats()
      ]);

      setNews(newsData);
      setBlogPosts(blogData);
      setNewsStats(newsStatsData);
      setBlogStats(blogStatsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Тестирование API...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Тест API</h1>
          <p className="mt-2 text-gray-600">
            Проверка работы API для новостей и блога
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Ошибка:</strong> {error}
          </div>
        )}

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Статистика новостей</CardTitle>
            </CardHeader>
            <CardContent>
              {newsStats ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Всего:</span>
                    <Badge variant="outline">{newsStats.total}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Опубликовано:</span>
                    <Badge className="bg-green-100 text-green-800">{newsStats.published}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Черновики:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{newsStats.draft}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Рекомендуемые:</span>
                    <Badge className="bg-purple-100 text-purple-800">{newsStats.featured}</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Нет данных</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Статистика блога</CardTitle>
            </CardHeader>
            <CardContent>
              {blogStats ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Всего:</span>
                    <Badge variant="outline">{blogStats.total}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Опубликовано:</span>
                    <Badge className="bg-green-100 text-green-800">{blogStats.published}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Черновики:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">{blogStats.draft}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Рекомендуемые:</span>
                    <Badge className="bg-purple-100 text-purple-800">{blogStats.featured}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Всего просмотров:</span>
                    <Badge className="bg-blue-100 text-blue-800">{blogStats.totalViews}</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Нет данных</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Новости */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Новости ({news.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {news.length > 0 ? (
              <div className="space-y-4">
                {news.slice(0, 3).map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {item.excerpt || item.content.substring(0, 100) + "..."}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="secondary">{item.author}</Badge>
                      {item.featured && <Badge className="bg-purple-100 text-purple-800">Рекомендуемая</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Новости не найдены</p>
            )}
          </CardContent>
        </Card>

        {/* Блог */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Статьи блога ({blogPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {blogPosts.length > 0 ? (
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <Badge variant="secondary">{post.author}</Badge>
                      <Badge variant="secondary">{post.read_time}</Badge>
                      {post.featured && <Badge className="bg-purple-100 text-purple-800">Рекомендуемая</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Статьи не найдены</p>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button onClick={testAPI} className="mr-4">
            Обновить данные
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestAPI;
