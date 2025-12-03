# 🔐 VirtualShop - Authentication Troubleshooting Guide

## Google Sign-In Not Working?

### 📋 Step-by-Step Solution

#### ✅ Step 1: Enable Google Authentication in Firebase

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Select your project: **virtualshop-630e3**

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click "Get Started" if you haven't set it up yet

3. **Enable Google Provider**
   - Click the "Sign-in method" tab
   - Find "Google" in the providers list
   - Click on "Google"
   - Toggle the "Enable" switch to ON
   - Click "Save"

#### ✅ Step 2: Verify Authorized Domains

1. In Firebase Console > Authentication
2. Click "Settings" tab
3. Scroll to "Authorized domains"
4. Make sure these are listed:
   - `localhost`
   - `virtualshop-630e3.firebaseapp.com`
   - `virtualshop-630e3.web.app` (if using hosting)

#### ✅ Step 3: Check Browser Settings

1. **Allow Popups**
   - Firebase uses popup for Google sign-in
   - Allow popups for `localhost:3000`

2. **Clear Browser Cache**
   - Press `Ctrl + Shift + Delete`
   - Clear cache and cookies
   - Restart browser

3. **Try Incognito/Private Mode**
   - Sometimes extensions block sign-in
   - Test in incognito mode first

#### ✅ Step 4: Check Console Errors

Open browser DevTools (F12) and look for errors:

**Common Errors & Solutions:**

```
❌ Error: "auth/unauthorized-domain"
✅ Solution: Add your domain to authorized domains in Firebase

❌ Error: "auth/popup-blocked"
✅ Solution: Allow popups in browser settings

❌ Error: "auth/operation-not-allowed"
✅ Solution: Enable Google provider in Firebase Console

❌ Error: "auth/internal-error"
✅ Solution: Check Firebase configuration is correct

❌ Error: "auth/network-request-failed"
✅ Solution: Check internet connection and firewall
```

### 🔍 Debugging Steps

#### 1. Test Firebase Connection

Open browser console (F12) and run:
```javascript
console.log('Auth Domain:', 'virtualshop-630e3.firebaseapp.com');
```

#### 2. Check if Firebase is Initialized

The app should load without errors. If you see Firebase errors immediately, check your configuration.

#### 3. Click Sign In Button

Watch the browser console for specific error messages.

### 🛠️ Advanced Fixes

#### If Still Not Working:

**Option 1: Recreate Firebase Project**
```
1. Create a new Firebase project
2. Enable Google Authentication
3. Get new configuration
4. Update src/firebase.js with new config
```

**Option 2: Use Different Browser**
```
Try these browsers in order:
1. Google Chrome
2. Microsoft Edge
3. Firefox
```

**Option 3: Check Network Settings**
```
- Disable VPN if active
- Check firewall settings
- Ensure no proxy blocking Firebase
```

### 📱 Testing Checklist

- [ ] Google provider is enabled in Firebase Console
- [ ] localhost is in authorized domains
- [ ] Browser allows popups for localhost
- [ ] No console errors when loading the page
- [ ] Clicking sign-in opens Google popup
- [ ] Can select Google account
- [ ] Redirects back to app after sign-in
- [ ] User info appears in navbar

### 🔄 Alternative Sign-In Method

If popup doesn't work, we can switch to redirect method:

**Update src/context/MarketplaceContext.js:**

```javascript
// Change from:
await signInWithPopup(auth, googleProvider);

// To:
await signInWithRedirect(auth, googleProvider);
```

**Add redirect result handler:**
```javascript
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';

// In useEffect:
useEffect(() => {
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        console.log('Signed in via redirect:', result.user);
      }
    })
    .catch((error) => {
      console.error('Redirect sign-in error:', error);
    });
}, []);
```

### 📞 Still Having Issues?

**Check These:**

1. **Firebase Project Status**
   - Project is active in Firebase Console
   - Billing is set up (if required)
   - No quota limits reached

2. **API Key Status**
   - API key is not restricted
   - Key has proper permissions

3. **Browser Extensions**
   - Disable ad blockers
   - Disable privacy extensions
   - Try in incognito mode

### ✅ Success Indicators

When working correctly, you should see:
1. ✅ Sign-in button appears
2. ✅ Click opens Google account selector
3. ✅ Select account proceeds
4. ✅ Returns to app
5. ✅ User photo and name appear in navbar
6. ✅ Can access cart and orders

### 🎯 Quick Test

After fixing, test the complete flow:
```
1. Open http://localhost:3000
2. Click "Sign In"
3. Select your Google account
4. Should redirect back
5. See your profile in navbar
6. Try adding item to cart
7. View cart page
8. Try checkout
```

---

## 💡 Pro Tips

- **Use Chrome DevTools** for best debugging experience
- **Check Network tab** to see Firebase API calls
- **Console tab** shows detailed error messages
- **Clear storage** if having persistent issues (F12 > Application > Clear storage)

## 📧 Support Resources

- Firebase Docs: https://firebase.google.com/docs/auth
- Stack Overflow: Search "Firebase Google Sign-In" + your error
- Firebase Support: https://firebase.google.com/support

---

**Last Updated:** After VirtualShop setup
**Your Firebase Project:** virtualshop-630e3



