package com.example.music.entity;

public class Record {
    String record;
    String account;

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    @Override
    public String toString() {
        return "Record{" +
                "record='" + record + '\'' +
                ", account='" + account + '\'' +
                '}';
    }
}
