import React, { createContext, useState, useCallback, useContext } from 'react';
import { AuthContext } from './AuthContext';
import userService from '../services/api/userService';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, updateUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const profileData = await userService.getProfile();
      setProfile(profileData);

      return { success: true, profile: profileData };
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedProfile = await userService.updateProfile(updates);
      
      setProfile(updatedProfile);
      
      // Update auth context if needed
      if (updateUser) {
        updateUser(updatedProfile);
      }

      return { success: true, profile: updatedProfile };
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, [updateUser]);

  const uploadProfileImage = useCallback(async (imageFile) => {
    try {
      setIsLoading(true);
      setError(null);

      const imageUrl = await userService.uploadProfileImage(imageFile);
      
      // Update profile with new image URL
      setProfile(prev => ({
        ...prev,
        profileImage: imageUrl
      }));

      return { success: true, imageUrl };
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const verifyAccount = useCallback(async (verificationCode) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await userService.verifyAccount(verificationCode);
      
      if (result.success) {
        setProfile(prev => ({
          ...prev,
          isVerified: true
        }));
      }

      return result;
    } catch (error) {
      console.error('Account verification failed:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getUserType = useCallback(() => {
    return user?.role || profile?.userType || null;
  }, [user, profile]);

  const isFarmer = useCallback(() => {
    return getUserType() === 'farmer';
  }, [getUserType]);

  const isBuyer = useCallback(() => {
    return getUserType() === 'buyer';
  }, [getUserType]);

  const isAdmin = useCallback(() => {
    return getUserType() === 'admin';
  }, [getUserType]);

  const value = {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    uploadProfileImage,
    verifyAccount,
    getUserType,
    isFarmer,
    isBuyer,
    isAdmin
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};