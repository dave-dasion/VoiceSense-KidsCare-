import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { COLORS, SHADOWS, FONTS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Post {
  id: string;
  category: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatarBg: string;
    initials: string;
  };
  timeAgo: string;
  likes: number;
  replies: Reply[];
  hasLiked?: boolean;
}

interface Reply {
  id: string;
  author: {
    name: string;
    role: string;
    avatarBg: string;
    initials: string;
  };
  content: string;
  timeAgo: string;
}

export default function DiscussionBoardScreen({ navigation }: any) {
  const [selectedChannel, setSelectedChannel] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPostVisible, setIsNewPostVisible] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostChannel, setNewPostChannel] = useState('General');
  
  // Thread Detail State
  const [activeThread, setActiveThread] = useState<Post | null>(null);
  const [newReplyContent, setNewReplyContent] = useState('');

  const channels = ['All', 'Clinical Questions', 'Compliance & Safety', 'General Support', 'Study Groups'];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      category: 'Clinical Questions',
      title: 'Best approach for assisting patients with mild cognitive decline?',
      content: 'I am currently working with a senior patient who is experiencing mild cognitive impairment. They frequently forget their medication schedule even with pill planners. What memory aids or techniques have you found most effective?',
      author: {
        name: 'Sarah Connor',
        role: 'Lead Caregiver',
        avatarBg: COLORS.primary,
        initials: 'SC',
      },
      timeAgo: '2h ago',
      likes: 12,
      hasLiked: false,
      replies: [
        {
          id: 'r1',
          author: {
            name: 'Dr. James Lim',
            role: 'Medical Advisor',
            avatarBg: COLORS.secondary,
            initials: 'JL',
          },
          content: 'Using smart pill dispensers that sound an alarm or send alerts to caregivers can be very helpful. Also, keeping a large, visual whiteboard schedule in their kitchen can reduce anxiety.',
          timeAgo: '1h ago',
        },
      ],
    },
    {
      id: '2',
      category: 'Compliance & Safety',
      title: 'New OSHA guidelines for mobility assistance transfers',
      content: 'Has everyone reviewed the updated guidelines for transfer assistance equipment? There are revised weight limit specifications for manual transfers without lifts. Make sure we are in compliance!',
      author: {
        name: 'Robert Vance',
        role: 'Safety Director',
        avatarBg: COLORS.success,
        initials: 'RV',
      },
      timeAgo: '5h ago',
      likes: 8,
      hasLiked: true,
      replies: [],
    },
    {
      id: '3',
      category: 'Study Groups',
      title: 'Exam preparation study group for advanced caregiver certification',
      content: 'Starting a weekly study session every Thursday at 6 PM. We will review clinical care scenarios and practice exam sample questions. Let me know if you want to be added to the invite list!',
      author: {
        name: 'Emily Davis',
        role: 'Care Coordinator',
        avatarBg: COLORS.warning,
        initials: 'ED',
      },
      timeAgo: '1d ago',
      likes: 15,
      hasLiked: false,
      replies: [
        {
          id: 'r2',
          author: {
            name: 'Alice Johnson',
            role: 'Junior Nurse',
            avatarBg: COLORS.secondary,
            initials: 'AJ',
          },
          content: 'I would love to join! I am taking the certification test next month and need to practice the scenarios.',
          timeAgo: '18h ago',
        },
      ],
    },
  ]);

  const handleLike = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            hasLiked,
            likes: hasLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
    // If active thread is currently viewed, update its like count as well
    if (activeThread && activeThread.id === postId) {
      setActiveThread(prev => {
        if (!prev) return null;
        const hasLiked = !prev.hasLiked;
        return {
          ...prev,
          hasLiked,
          likes: hasLiked ? prev.likes + 1 : prev.likes - 1,
        };
      });
    }
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      category: newPostChannel,
      title: newPostTitle,
      content: newPostContent,
      author: {
        name: 'You',
        role: 'Learner',
        avatarBg: COLORS.secondary,
        initials: 'ME',
      },
      timeAgo: 'Just now',
      likes: 0,
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    setIsNewPostVisible(false);
  };

  const handleSendReply = () => {
    if (!newReplyContent.trim() || !activeThread) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        role: 'Learner',
        avatarBg: COLORS.secondary,
        initials: 'ME',
      },
      content: newReplyContent,
      timeAgo: 'Just now',
    };

    // Update active thread replies
    const updatedThread = {
      ...activeThread,
      replies: [...activeThread.replies, newReply],
    };
    setActiveThread(updatedThread);

    // Update posts state
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === activeThread.id) {
          return updatedThread;
        }
        return post;
      })
    );

    setNewReplyContent('');
  };

  const filteredPosts = posts.filter(post => {
    const matchesChannel = selectedChannel === 'All' || post.category === selectedChannel;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="menu-outline" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussion & Collab</Text>
        <TouchableOpacity onPress={() => setIsNewPostVisible(true)} style={styles.addPostButton}>
          <Ionicons name="add-circle" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Text style={styles.bannerTitle}>Collaborative Learning Space</Text>
          <Text style={styles.bannerDesc}>Discuss care topics, ask medical questions, and share guidance with colleagues.</Text>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.textLight} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations..."
              placeholderTextColor={COLORS.textLight}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </LinearGradient>

        {/* Channel Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.channelScroll}
          contentContainerStyle={styles.channelScrollContainer}
        >
          {channels.map((chan) => {
            const isSelected = selectedChannel === chan;
            return (
              <TouchableOpacity
                key={chan}
                onPress={() => setSelectedChannel(chan)}
                style={[styles.channelBtn, isSelected && styles.channelBtnActive]}
              >
                <Text style={[styles.channelText, isSelected && styles.channelTextActive]}>{chan}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Posts List */}
        <View style={styles.postsContainer}>
          {filteredPosts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="chatbubbles-outline" size={48} color={COLORS.textLight} />
              <Text style={styles.emptyText}>No discussions found in this category.</Text>
            </View>
          ) : (
            filteredPosts.map((post) => (
              <TouchableOpacity 
                key={post.id} 
                style={styles.postCard}
                onPress={() => setActiveThread(post)}
              >
                <View style={styles.postHeader}>
                  <View style={[styles.avatar, { backgroundColor: post.author.avatarBg }]}>
                    <Text style={styles.avatarText}>{post.author.initials}</Text>
                  </View>
                  <View style={styles.authorInfo}>
                    <Text style={styles.authorName}>{post.author.name}</Text>
                    <Text style={styles.authorRole}>{post.author.role}</Text>
                  </View>
                  <Text style={styles.timeText}>{post.timeAgo}</Text>
                </View>

                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postContentPreview} numberOfLines={2}>{post.content}</Text>

                <View style={styles.postFooter}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{post.category}</Text>
                  </View>
                  <View style={styles.statsRow}>
                    <TouchableOpacity onPress={() => handleLike(post.id)} style={styles.statBtn}>
                      <Ionicons 
                        name={post.hasLiked ? "heart" : "heart-outline"} 
                        size={18} 
                        color={post.hasLiked ? COLORS.danger : COLORS.textLight} 
                      />
                      <Text style={[styles.statText, post.hasLiked && { color: COLORS.danger }]}>{post.likes}</Text>
                    </TouchableOpacity>
                    <View style={styles.statBtn}>
                      <Ionicons name="chatbubble-outline" size={18} color={COLORS.textLight} />
                      <Text style={styles.statText}>{post.replies.length}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* New Post Modal */}
      <Modal visible={isNewPostVisible} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Discussion</Text>
              <TouchableOpacity onPress={() => setIsNewPostVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Select Category</Text>
            <View style={styles.channelRow}>
              {channels.slice(1).map((chan) => (
                <TouchableOpacity
                  key={chan}
                  onPress={() => setNewPostChannel(chan)}
                  style={[styles.smallChannelBtn, newPostChannel === chan && styles.channelBtnActive]}
                >
                  <Text style={[styles.smallChannelText, newPostChannel === chan && styles.channelTextActive]}>
                    {chan}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Discussion Title</Text>
            <TextInput
              style={styles.input}
              placeholder="What is your discussion topic?"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
            />

            <Text style={styles.label}>Content / Question details</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide more context or ask your question here..."
              multiline
              value={newPostContent}
              onChangeText={setNewPostContent}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleCreatePost}>
              <Text style={styles.submitBtnText}>Post Conversation</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Active Thread Detail Modal */}
      <Modal visible={activeThread !== null} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          {activeThread && (
            <View style={[styles.modalContent, styles.threadContent]}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle} numberOfLines={1}>Discussion Thread</Text>
                <TouchableOpacity onPress={() => setActiveThread(null)}>
                  <Ionicons name="close" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.threadScroll} showsVerticalScrollIndicator={false}>
                {/* Main Post */}
                <View style={styles.threadMainPost}>
                  <View style={styles.postHeader}>
                    <View style={[styles.avatar, { backgroundColor: activeThread.author.avatarBg }]}>
                      <Text style={styles.avatarText}>{activeThread.author.initials}</Text>
                    </View>
                    <View style={styles.authorInfo}>
                      <Text style={styles.authorName}>{activeThread.author.name}</Text>
                      <Text style={styles.authorRole}>{activeThread.author.role}</Text>
                    </View>
                    <Text style={styles.timeText}>{activeThread.timeAgo}</Text>
                  </View>
                  <Text style={styles.threadTitleText}>{activeThread.title}</Text>
                  <Text style={styles.threadBodyText}>{activeThread.content}</Text>

                  <View style={styles.threadFooter}>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{activeThread.category}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleLike(activeThread.id)} style={styles.threadLikeBtn}>
                      <Ionicons 
                        name={activeThread.hasLiked ? "heart" : "heart-outline"} 
                        size={20} 
                        color={activeThread.hasLiked ? COLORS.danger : COLORS.textLight} 
                      />
                      <Text style={[styles.threadLikeText, activeThread.hasLiked && { color: COLORS.danger }]}>
                        {activeThread.likes} Likes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Replies Section */}
                <Text style={styles.repliesTitle}>Replies ({activeThread.replies.length})</Text>
                {activeThread.replies.map((reply) => (
                  <View key={reply.id} style={styles.replyCard}>
                    <View style={styles.postHeader}>
                      <View style={[styles.avatar, { backgroundColor: reply.author.avatarBg, width: 28, height: 28, borderRadius: 14 }]}>
                        <Text style={[styles.avatarText, { fontSize: 10 }]}>{reply.author.initials}</Text>
                      </View>
                      <View style={styles.authorInfo}>
                        <Text style={styles.replyAuthorName}>{reply.author.name}</Text>
                        <Text style={styles.replyAuthorRole}>{reply.author.role}</Text>
                      </View>
                      <Text style={styles.timeText}>{reply.timeAgo}</Text>
                    </View>
                    <Text style={styles.replyContentText}>{reply.content}</Text>
                  </View>
                ))}
              </ScrollView>

              {/* Reply Input Box */}
              <View style={styles.replyInputRow}>
                <TextInput
                  style={styles.replyInput}
                  placeholder="Write a reply..."
                  value={newReplyContent}
                  onChangeText={setNewReplyContent}
                />
                <TouchableOpacity style={styles.replySendBtn} onPress={handleSendReply}>
                  <Ionicons name="send" size={16} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  addPostButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  banner: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    ...SHADOWS.medium,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  bannerDesc: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
  },
  channelScroll: {
    marginBottom: 12,
  },
  channelScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  channelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...SHADOWS.light,
  },
  channelBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  channelText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  channelTextActive: {
    color: COLORS.white,
  },
  postsContainer: {
    paddingHorizontal: 16,
  },
  postCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 14,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  authorRole: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 1,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 6,
  },
  postContentPreview: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
    marginBottom: 14,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  tag: {
    backgroundColor: COLORS.secondary + '15',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    color: COLORS.secondary,
    fontSize: 10,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  statText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 4,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: COLORS.textLight,
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
    marginTop: 12,
  },
  channelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  smallChannelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
    marginBottom: 8,
  },
  smallChannelText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
    color: COLORS.textDark,
    marginBottom: 8,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  threadContent: {
    height: '85%',
  },
  threadScroll: {
    flex: 1,
  },
  threadMainPost: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 20,
    marginBottom: 20,
  },
  threadTitleText: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.textDark,
    lineHeight: 24,
    marginTop: 8,
    marginBottom: 10,
  },
  threadBodyText: {
    fontSize: 14.5,
    color: COLORS.textDark,
    lineHeight: 22,
    marginBottom: 16,
  },
  threadFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  threadLikeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  threadLikeText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontWeight: '600',
    marginLeft: 6,
  },
  repliesTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  replyCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  replyAuthorName: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  replyAuthorRole: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 1,
  },
  replyContentText: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
    marginTop: 6,
  },
  replyInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  replyInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 13,
    color: COLORS.textDark,
    backgroundColor: '#F8FAFC',
  },
  replySendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
