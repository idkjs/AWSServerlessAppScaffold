#!/usr/local/bin/python

import json
import boto3
import argparse

verbose = False

def parseArgs():

    parser = argparse.ArgumentParser("Upload Itens do DynamoDB Table")
    parser.add_argument("-t", "--Table", help="DynamoDB Table Name", required=True)
    parser.add_argument("-f", "--File", help="File with Itens to be Uploaded in JSON Array Format", required=True)
    parser.add_argument("-p", "--Profile", help="AWS CLI Profile")
    parser.add_argument("-v", "--Verbose", help="Show steps", action="store_true")

    return parser.parse_args()

def getObjects(filename):

    if verbose:
        print("Reading " + filename + "...")
    
    jsonfile = open(filename)
    jsonstr = jsonfile.read()
    return json.loads(jsonstr)    

def cleanItem(item):
    newvalue = {k:v for k, v in item.items() if v != ''}
    return newvalue

def getSession(awsProfile):
    if awsProfile == None:
        return boto3.Session()
    else:
        return boto3.Session(profile_name=awsProfile)

def uploadItems(session, tablename, objects):

    if verbose:
        lenght = len(objects)
        print("Uploading " + str(lenght) + "...")

    dynamodb = session.resource('dynamodb')
    tableref = dynamodb.Table(tablename)
    for item in objects:
        item = cleanItem(item)
        tableref.put_item(Item=item)    

args = parseArgs()
verbose = args.Verbose

session = getSession(args.Profile)
objects = getObjects(args.File)
uploadItems(session, args.Table, objects)
