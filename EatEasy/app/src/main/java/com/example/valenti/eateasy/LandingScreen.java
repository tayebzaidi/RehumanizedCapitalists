package com.example.valenti.eateasy;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class LandingScreen extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_landing_screen);
    }

    public void goToScreen(View view){
        Intent intent = new Intent(this, Restrictions.class);
        startActivity(intent);
    }
}
