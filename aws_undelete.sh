#!/bin/bash
#
# This script can be used to undelete objects from an S3 bucket.
# When run, it will print out a list of AWS commands to undelete files, which you
# can then pipe into Bash.
#
# e.g.: s3-undelete.sh <options> > files.txt; cat files.txt | bash
#
# You will need the AWS CLI tool from https://aws.amazon.com/cli/ in order to run this script.
#
# Note that you must have the following permissions via IAM:
#
# Bucket permissions:
#
#	s3:ListBucket
#	s3:ListBucketVersions
#
# File permissions:
#
#	s3:PutObject
#	s3:GetObject
#	s3:DeleteObject
#	s3:DeleteObjectVersion
#
# If you want to do this in a "quick and dirty manner", you could just grant s3:* to
# the account, but I don't really recommend that.
#


# Errors are fatal
set -e

PROFILE=""
BUCKET=""
PATTERN=""


#
# Print up our syntax and then exit.
#
function printSyntax() {
	echo "! "
	echo "! Syntax: $0 [--profile profile] bucket pattern"
	echo "! "
	echo "! profile - The profile for the AWS CLI tool"
	echo "! bucket - Which bucket to go throgh"
	echo "! pattern - A string to match file/directory names again"
	echo "! "
	exit 1
}


#
# Parse our arguments
#
while test "$1"
do

	ARG=$1
	ARG_NEXT=$2
	shift

	if test "$ARG" == "-h" -o "$ARG" == "--help"
	then
		printSyntax

	elif test "$ARG" == "--profile"
	then
		PROFILE="--profile $ARG_NEXT"
		shift

	elif test ! "$BUCKET"
	then
		BUCKET=$ARG

	else
		PATTERN=$ARG

	fi


done


if test ! "$BUCKET" -o ! "$PATTERN"
then
	printSyntax
fi


#
# Print out any debugging information
#
if test "$DEBUG"
then
	echo "DEBUG: Profile: $PROFILE, Bucket: $BUCKET, Pattern: $PATTERN"
fi


#
# This will print out our commands
#
echo aws $PROFILE --output text s3api list-object-versions --bucket $BUCKET \
			| grep -i $PATTERN \
			| grep -E "^DELETEMARKERS" \
			| awk '{FS = "[\t]+"; print "aws --profile odrive s3api delete-object --bucket dmuth-odrive --key \""$3"\" --version-id "$5";"}'
      
aws $PROFILE --output text s3api list-object-versions --bucket $BUCKET \
			| grep -i $PATTERN \
			| grep -E "^DELETEMARKERS" \
			| awk '{FS = "[\t]+"; print "aws --profile odrive s3api delete-object --bucket dmuth-odrive --key \""$3"\" --version-id "$5";"}'
