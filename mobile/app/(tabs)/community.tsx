import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { useState } from 'react';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState<'events' | 'forum'>('events');

  // Mock data - replace with API calls
  const events = [
    {
      id: '1',
      name: 'Protocol Championship 2024',
      date: '2024-06-15',
      location: 'Los Angeles, CA',
      registered: 45,
      maxParticipants: 100,
    },
  ];

  const forumPosts = [
    {
      id: '1',
      title: 'Best scaling for Fran?',
      author: 'John Doe',
      category: 'workouts',
      replies: 12,
      likes: 8,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}
        >
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'forum' && styles.activeTab]}
          onPress={() => setActiveTab('forum')}
        >
          <Text style={[styles.tabText, activeTab === 'forum' && styles.activeTabText]}>
            Forum
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'events' ? (
          <View style={styles.eventsContainer}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
                <View style={styles.eventStats}>
                  <Text style={styles.eventStatsText}>
                    {event.registered}/{event.maxParticipants} registered
                  </Text>
                </View>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.forumContainer}>
            {forumPosts.map((post) => (
              <View key={post.id} style={styles.forumCard}>
                <Text style={styles.forumTitle}>{post.title}</Text>
                <Text style={styles.forumAuthor}>by {post.author}</Text>
                <View style={styles.forumMeta}>
                  <Text style={styles.forumMetaText}>{post.replies} replies</Text>
                  <Text style={styles.forumMetaText}>{post.likes} likes</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray800,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.green,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray500,
  },
  activeTabText: {
    color: Colors.green,
  },
  content: {
    flex: 1,
  },
  eventsContainer: {
    padding: 20,
  },
  eventCard: {
    backgroundColor: Colors.gray900,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  eventName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  eventDate: {
    fontSize: 14,
    color: Colors.green,
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: Colors.gray400,
    marginBottom: 12,
  },
  eventStats: {
    marginBottom: 16,
  },
  eventStatsText: {
    fontSize: 14,
    color: Colors.gray300,
  },
  registerButton: {
    backgroundColor: Colors.green,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  forumContainer: {
    padding: 20,
  },
  forumCard: {
    backgroundColor: Colors.gray900,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray800,
  },
  forumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  forumAuthor: {
    fontSize: 14,
    color: Colors.gray400,
    marginBottom: 12,
  },
  forumMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  forumMetaText: {
    fontSize: 14,
    color: Colors.gray500,
  },
});

