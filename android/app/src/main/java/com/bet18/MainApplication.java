package com.bet18;


import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  public final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  @Override
  public boolean getUseDeveloperSupport() {
      // Make sure you are using BuildConfig from your own application
      return BuildConfig.DEBUG;
  }
  @Override
  protected List<ReactPackage> getPackages() {
      // Add additional packages you require here
      // No need to add RnnPackage and MainReactPackage
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new VectorIconsPackage()
          );
  }

  @Override
  public String getJSMainModuleName() {
    return "index";
  }
};

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  
  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

}
